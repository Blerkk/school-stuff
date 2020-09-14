import os
import threading
import tkinter as Tk
import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008

#Szoftveres SPI
#CLK  = 18
#MISO = 23
#MOSI = 24
#CS   = 25
#mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

#SPI
SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

mainablak = Tk.Tk()
mainablak.geometry("800x600")

def readADC(channel):
    return mcp.read_adc(channel)

class Widget():
    def __init__(self, Xc,Yc, channel):
        self.Widget = Tk.Frame(mainablak, height=300, width=200, bg="white")
        self.Channel = channel
        self.UpdateToggleVar = Tk.IntVar()
        self.UpdateToggle = Tk.Checkbutton(self.Widget, font="Roboto 12", text="Frissítés", variable=self.UpdateToggleVar)
        self.UpdateToggle.place(x=100, y=100, anchor="center")
        self.Value = Tk.StringVar()
        self.Value.set("N/A")
        self.ValueLabel = Tk.Label(self.Widget, font="Roboto 15", textvariable=self.Value)
        self.ValueLabel.place(x=100, y=60, anchor="center")
        self.ChannelLabel = Tk.Label(self.Widget, font="Roboto 20", text="Channel " + str(self.Channel))
        self.ChannelLabel.place(x=100, y=20, anchor="center")
        self.Widget.place(x=Xc,y=Yc)
    def updateValue(self):
        if(self.UpdateToggleVar.get() == False):
            pass
        else:
            self.Value.set(str(round(readADC(self.Channel),5)) + " V")

w1 = Widget(0,0,1)
w2 = Widget(0,300,2)
w3 = Widget(200,0,3)
w4 = Widget(200,300,4)
w5 = Widget(400,0,5)
w6 = Widget(400,300,6)
w7 = Widget(600,0,7)
w8 = Widget(600,300,8)

def t1():
    while 1:
        w1.updateValue()
        w2.updateValue()
        w3.updateValue()
        w4.updateValue()
        w5.updateValue()
        w6.updateValue()
        w7.updateValue()
        w8.updateValue()

try:
    thread1 = threading.Thread(target=t1)
    thread1.daemon = True
    thread1.start()
except:
    print("Nem sikerült elindítani a threadet")
    
mainablak.mainloop()
os._exit(1)