import random
import RPi.GPIO as GPIO
import time
import tkinter as tk
import threading

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

class Boja():
    def __init__(self,Name,GPIO_Output,GPIO_Input):
        self.bojaname = Name
        self.GPIOOut = GPIO_Output
        self.GPIOIn = GPIO_Input
        GPIO.setup(self.GPIOOut, GPIO.OUT)
        GPIO.setup(self.GPIOIn, GPIO.IN)
        GPIO.output(self.GPIOOut, False)
    def __del__(self):
        GPIO.output(self.GPIOOut, False)
        pass
    def OutHigh(self):
        GPIO.output(self.GPIOOut, True)
        pass
    def OutLow(self):
        GPIO.output(self.GPIOOut, False)
        pass
    def Input(self):
        return GPIO.input(self.GPIOIn)
        pass
    def name(self):
        return self.bojaname

#[Bója név, Output PIN, Input PIN]

bojak = [
    ["Bója1",11,31],
    ["Bója2",12,32,
    ["Bója3",13,33,
    ["Bója4",15,35],
    ["Bója5",16,36],
    ["Bója6",18,37],
    ["Bója7",22,38],
    ["Bója8",29,40],
]

aktivBojak = []
aktivBoja = -1
stopperStart = False
stopperKezdo = 0

def endGame():
    global stopperStart
    aktivBojaVar.set("Célpont: vége")
    stopperStart = False

def startGame():
    global bojak, aktivBojak, aktivBoja, stopperStart, stopperKezdo
    stopperStart = False
    aktivBoja = -1
    aktivBojak.clear
    time.sleep(0.6)

    for i in range(0,len(bojak)):
        aktivBojak.append(Boja(bojak[i][0],bojak[i][1],bojak[i][2]))
        stopperKezdo = time.time()
        stopperStart = True
        aktivalRandom()

def checkAktiv():
    global bojak, aktivBojak, aktivBoja
    if(aktivBojak[aktivBoja].Input()):
        aktivBojak.pop(aktivBoja)
        if(len(aktivBojak)==0):
            endGame()
        else:
            aktivalRandom()

def aktivalRandom():
    global bojak, aktivBojak, aktivBoja
    rand = random.randint(0,len(aktivBojak)-1)
    aktivBojak[rand].OutHigh()
    aktivBojaVar.set("Célpont: " + aktivBojak[rand].name())
    aktivBoja = rand

def stopper():
    global stopperStart,stopperKezdo
    while True:
        while stopperStart:
            stoppertime = (time.time()-stopperKezdo)
            stopperVar.set("Stopper: " + str(round(stoppertime,3)))
            checkAktiv()
            time.sleep(0.1)

window = tk.Tk()
window.geometry("600x350")
window.title("Boják")

aktivBojaVar = tk.StringVar()
aktivBojaVar.set("Célpont: -")
aktivBojaLabel = tk.Label(window,textvariable=aktivBojaVar,font=("Times new roman", 44))
aktivBojaLabel.place(x=25,y=25)

stopperVar = tk.StringVar()
stopperVar.set("Stopper: -")
stopperLabel = tk.Label(window,textvariable=stopperVar,font=("Times new roman", 44))
stopperLabel.place(x=25,y=125)

startButton = tk.Button(window,text="Start", command=startGame,font=("Times new roman", 44))
startButton.place(x=25,y=225)

StopperThread = threading.Thread(target=stopper)
StopperThread.start()
window.mainloop()
window.quit()
GPIO.cleanup()