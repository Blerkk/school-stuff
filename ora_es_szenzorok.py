import os
import threading
import tkinter as Tk
from time import *
import w1thermsensor

ablak = Tk.Tk()
ablak.title('Clock') 
width, height = ablak.winfo_screenwidth(), ablak.winfo_screenheight()
ablak.geometry('%dx%d+0+0' % (width-250,height-250))
homSensor = W1ThermSensor()

class Ido:
    def __init__(self, Xc,Yc):
        self.pontosIdo = Tk.StringVar(ablak, value="")
        self.timeLabel = Tk.Label(ablak, font = ('calibri', 150, 'bold'), background = 'black', foreground = 'white', textvariable = self.pontosIdo)
        self.timeLabel.place(x=Xc,y=Yc, anchor="center")
    def updateTime(self):
        self.pontosIdo.set(strftime('%H:%M:%S'))
        sleep(1)

class Szenzorok:
    def __init__(self, Xc, Yc, pin):
        self.temperature = Tk.IntVar(ablak, value = homSensor.get_temperature())
        self.formattedTemp = ""
        self.szenzor1 = Tk.Label(ablak, font = ('calibri', 50, 'bold'), background = 'black', foreground = 'white', textvariable = self.temperature)
        self.szenzor1.place(x=Xc,y=Yc, anchor="center")
    def updateSzenzor(self):
        self.formattedTemp = str(self.temperature) + " C"
        self.temperature.set(self.formattedTemp)
        sleep(1)

ido1 = Ido(750,100)
szenzor1 = Szenzorok(750, 300, 10)

def t1():
    while True:
        ido1.updateTime()
def t2():
    while True:
        szenzor1.updateSzenzor()

try:
    thread1 = threading.Thread(target=t1)
    thread1.daemon = True
    thread1.start()
    print("A thread 1 elindult")
    thread2 = threading.Thread(target=t2)
    thread2.daemon = True
    thread2.start()
    print("A thread 2 elindult")
except:
    print("Thread eleg ritkasan(nem) indult el")

ablak.mainloop()
os._exit(1)