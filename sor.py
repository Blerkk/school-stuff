import RPi.GPIO as GPIO
from tkinter import *

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)
GPIO.setup(12, GPIO.OUT)
GPIO.setup(13, GPIO.OUT)
GPIO.setup(15, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)

ablak = Tk() ablak.title("GPIO kapcsolo")
ablak.geometry("200x250")
ablak.resizable(0, 0)

on1 = 0
on2 = 0
on3 = 0
on4 = 0
on5 = 0
on6 = 0
on7 = 0
on8 = 0

elsoGombAllapot = StringVar()
masodikGombAllapot = StringVar()
harmadikGombAllapot = StringVar()
negyedikGombAllapot = StringVar()
otodikGombAllapot = StringVar()
hatodikGombAllapot = StringVar()
hetedikGombAllapot = StringVar()
nyolcadikGombAllapot = StringVar()

def elsoGomb():
    global on1
    if on1 == 0:
        on1 = 1
        elsoGombAllapot.set("felkapcsolva")
        GPIO.output(7, 1)
    else:
        on1 = 0
        elsoGombAllapot.set("lekapcsolva")
        GPIO.output(7, 0)

def masodikGomb():
    global on2
    if on2 == 0:
        on2 = 1
        masodikGombAllapot.set("felkapcsolva")
        GPIO.output(11, 1)
    else:
        on2 = 0
        masodikGombAllapot.set("lekapcsolva")
        GPIO.output(11, 0)

def harmadikGomb():
    global on3
    if on3 == 0:
        on3 = 1
        harmadikGombAllapot.set("felkapcsolva")
        GPIO.output(12, 1)
    else:
        on3 = 0
        harmadikGombAllapot.set("lekapcsolva")
        GPIO.output(12, 0)

def negyedikGomb():
    global on4
    if on4 == 0:
        on4 = 1
        negyedikGombAllapot.set("felkapcsolva")
        GPIO.output(13, 1)
    else:
        on4 = 0
        negyedikGombAllapot.set("lekapcsolva")
        GPIO.output(13, 0)

def otodikGomb():
    global on5
    if on5 == 0:
        on5 = 1
        otodikGombAllapot.set("felkapcsolva")
        GPIO.output(15, 1)
    else:
        on5 = 0
        otodikGombAllapot.set("lekapcsolva")
        GPIO.output(15, 0)

def hatodikGomb():
    global on6
    if on6 == 0:
        on6 = 1
        hatodikGombAllapot.set("felkapcsolva")
        GPIO.output(16, 1)
    else:
        on6 = 0
        hatodikGombAllapot.set("lekapcsolva")
        GPIO.output(16, 0)

def hetedikGomb():
    global on7
    if on7 == 0:
        on7 = 1
        hetedikGombAllapot.set("felkapcsolva")
        GPIO.output(18, 1)
    else:
        on7 = 0
        hetedikGombAllapot.set("lekapcsolva")
        GPIO.output(18, 0)

def nyolcadikGomb():
    global on8
    if on8 == 0:
        on8 = 1
        nyolcadikGombAllapot.set("felkapcsolva")
        GPIO.output(22, 1)
    else:
        on8 = 0
        nyolcadikGombAllapot.set("lekapcsolva")
        GPIO.output(22, 0)

def quit():
    ablak.destroy()
    GPIO.cleanup()
    GPIO.output(7, 0)
    GPIO.output(11, 0)
    GPIO.output(12, 0)
    GPIO.output(13, 0)
    GPIO.output(15, 0)
    GPIO.output(16, 0)
    GPIO.output(18, 0)
    GPIO.output(22, 0)

Button(ablak, text="1. gomb", command=elsoGomb).grid(column=0, row=0)
Button(ablak, text="2. gomb", command=masodikGomb).grid(column=0, row=1)
Button(ablak, text="3. gomb", command=harmadikGomb).grid(column=0, row=2)
Button(ablak, text="4. gomb", command=negyedikGomb).grid(column=0, row=3)
Button(ablak, text="5. gomb", command=otodikGomb).grid(column=0, row=4)
Button(ablak, text="6. gomb", command=hatodikGomb).grid(column=0, row=5)
Button(ablak, text="7. gomb", command=hetedikGomb).grid(column=0, row=6)
Button(ablak, text="8. gomb", command=nyolcadikGomb).grid(column=0, row=7)

Button(ablak, text="Quit", command=quit).grid(column=2, row=10)

Label(ablak, text="1. allapota:").grid(column=2, row=0)
Label(ablak, textvariable = elsoGombAllapot).grid(column=3, row=0)
Label(ablak, text="2. allapota:").grid(column=2, row=1)
Label(ablak, textvariable = masodikGombAllapot).grid(column=3, row=1)
Label(ablak, text="3. allapota:").grid(column=2, row=2)
Label(ablak, textvariable = harmadikGombAllapot).grid(column=3, row=2)
Label(ablak, text="4. allapota:").grid(column=2, row=3)
Label(ablak, textvariable = negyedikGombAllapot).grid(column=3, row=3)
Label(ablak, text="5. allapota:").grid(column=2, row=4)
Label(ablak, textvariable = otodikGombAllapot).grid(column=3, row=4)
Label(ablak, text="6. allapota:").grid(column=2, row=5)
Label(ablak, textvariable = hatodikGombAllapot).grid(column=3, row=5)
Label(ablak, text="7. allapota:").grid(column=2, row=6)
Label(ablak, textvariable = hetedikGombAllapot).grid(column=3, row=6)
Label(ablak, text="8. allapota:").grid(column=2, row=7)
Label(ablak, textvariable = nyolcadikGombAllapot).grid(column=3, row=7)

ablak.mainloop()