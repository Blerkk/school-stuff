import sys
import os
from tkinter import *
from PIL import Image, ImageTk
import threading
import time

#================================
import RPi.GPIO as GPIO
from w1thermsensor import W1ThermSensor
#homSensor = W1ThermSensor()

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

#Konyha lampa
konyha = 11
GPIO.setup(konyha, GPIO.OUT)
#konyha ablak erzekelo
konyhaErzekelo = 22
GPIO.setup(konyhaErzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


#Nappali lampa
nappali = 13
GPIO.setup(nappali, GPIO.OUT)
#nappali ablak erzekelo
nappaliErzekelo = 29
GPIO.setup(nappaliErzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


#Haloszoba lampa
haloszoba = 15
GPIO.setup(haloszoba, GPIO.OUT)
#haloszoba ablak erzekelo
haloszobaErzekelo = 31
GPIO.setup(haloszobaErzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


#Kulteri lampa
kulteri = 16
GPIO.setup(kulteri, GPIO.OUT)
#garazs ajto erzekelo
garazsErzekelo = 32
GPIO.setup(garazsErzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


#viz a pinceben
vizerzekelo = 36
GPIO.setup(vizerzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
#viz a pinceben risztas lampa
vizerzekeloLampa = 40
GPIO.setup(vizerzekeloLampa, GPIO.OUT)
#mozgaserzekelo riasztas
mozgaserzekelo = 33
GPIO.setup(mozgaserzekelo, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
#mozgaserzekelo riaszto lampa
riasztoLampa = 38
GPIO.setup(riasztoLampa, GPIO.OUT)
#kulso fenyeroseeg
fenyerosseg = 37
GPIO.setup(fenyerosseg, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


    # # #garazs ajto nyito
    # # garazs = 
    # # GPIO.setup(garazs, GPIO.OUT)

#================================

class Fullscreen_Window(Frame):
    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.master = master
        self.fullscreenState = False
        self.villanyState = False
        self.garazsState = False
        self.tempVar = StringVar()
        self.tempVar.set("N/A °C")
        self.wetVar = StringVar()
        self.motionVar = StringVar()
        gui.bind("<f>", self.toggle_fullscreen)
        gui.bind("<Escape>", self.exit_fullscreen)

        self.hatterkep = Image.open("img/bg.png")
        self.villanyLe = Image.open("img/lightbulb_le.png")
        self.villanyFel = Image.open("img/lightbulb_fel.png")
        self.garazsOpen = Image.open("img/garazs_open.png")
        self.garazsClosed = Image.open("img/garazs_closed.png")
        self.ablakOpen = Image.open("img/window_open.png")
        self.ablakClosed = Image.open("img/window_closed.png")

        self.fullscreen_hatterkep_fele = self.hatterkep.resize((round(gui.winfo_screenwidth() / 2), round(gui.winfo_screenheight() / 2)))
        self.fullscreen_hatterkep = self.hatterkep.resize((gui.winfo_screenwidth(),gui.winfo_screenheight()))
        self.resized_villany_le_kicsi = self.villanyLe.resize((50,50), Image.ANTIALIAS)
        self.resized_villany_fel_kicsi = self.villanyFel.resize((50,50), Image.ANTIALIAS)
        self.resized_villany_le_nagy = self.villanyLe.resize((100,100), Image.ANTIALIAS)
        self.resized_villany_fel_nagy = self.villanyFel.resize((100,100), Image.ANTIALIAS)
        self.resized_garazs_open_kicsi = self.garazsOpen.resize((238,42), Image.ANTIALIAS)
        self.resized_garazs_open_nagy = self.garazsOpen.resize((479,87), Image.ANTIALIAS)
        self.resized_garazs_close_kicsi = self.garazsClosed.resize((238,168), Image.ANTIALIAS)
        self.resized_garazs_close_nagy = self.garazsClosed.resize((479,335), Image.ANTIALIAS)

        self.resized_window_open_kicsi = self.ablakOpen.resize((144,128), Image.ANTIALIAS)
        self.resized_window_open_nagy = self.ablakOpen.resize((288,255), Image.ANTIALIAS)
        self.resized_window_close_kicsi = self.ablakClosed.resize((144,128), Image.ANTIALIAS)
        self.resized_window_close_nagy = self.ablakClosed.resize((288,255), Image.ANTIALIAS)
        self.tervrajzFullscreenFele = ImageTk.PhotoImage(self.fullscreen_hatterkep_fele)
        self.tervrajzFullscreen = ImageTk.PhotoImage(self.fullscreen_hatterkep)
        self.villanyLeResizedKicsi = ImageTk.PhotoImage(self.resized_villany_le_kicsi)
        self.villanyFelResizedKicsi = ImageTk.PhotoImage(self.resized_villany_fel_kicsi)
        self.villanyLeResizedNagy = ImageTk.PhotoImage(self.resized_villany_le_nagy)
        self.villanyFelResizedNagy = ImageTk.PhotoImage(self.resized_villany_fel_nagy)
        self.garazsOpenResizedKicsi = ImageTk.PhotoImage(self.resized_garazs_open_kicsi)
        self.garazsOpenResizedNagy = ImageTk.PhotoImage(self.resized_garazs_open_nagy)
        self.garazsCloseResizedKicsi = ImageTk.PhotoImage(self.resized_garazs_close_kicsi)
        self.garazsCloseResizedNagy = ImageTk.PhotoImage(self.resized_garazs_close_nagy)
        self.ablakOpenResizedKicsi = ImageTk.PhotoImage(self.resized_window_open_kicsi)
        self.ablakOpenResizedNagy = ImageTk.PhotoImage(self.resized_window_open_nagy)
        self.ablakCloseResizedKicsi = ImageTk.PhotoImage(self.resized_window_close_kicsi)
        self.ablakCloseResizedNagy = ImageTk.PhotoImage(self.resized_window_close_nagy)

        self.label = Label(image = self.tervrajzFullscreenFele) # -Fele
        self.homersekletLabel = Label(border = 0, borderwidth = 0, background = "black", foreground="white", activebackground = "black", text="N/A", textvariable=self.tempVar)
        self.motionLabel = Label(border = 0, borderwidth = 0, background = "black", foreground="white", activebackground = "black", text="N/A", textvariable=self.motionVar)
        self.wetLabel = Label(border = 0, borderwidth = 0, background = "black", foreground="white", activebackground = "black", text="N/A", textvariable=self.wetVar)
        
        self.nappaliKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.nappaliKapcsolo))
        self.haloKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.haloKapcsolo))
        self.konyhaKapcsolo = Button(image  =self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.konyhaKapcsolo))
        self.kulteriKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.kulteriKapcsolo))
        # ez a garazs lehet gomb is, mert mukodik, meglepo modon, de egyelore csak egy label, hogy fizikai gombbal lehessen kapcsolni
        self.garazsKapcsolo = Label(image = self.garazsCloseResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black")
        #
        self.nappaliAblak = Label(image = self.ablakCloseResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black")
        self.haloAblak = Label(image = self.ablakCloseResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black")
        self.konyhaAblak = Label(image  =self.ablakCloseResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black")
        
        self.kapcsolok = [self.nappaliKapcsolo, self.haloKapcsolo, self.konyhaKapcsolo, self.kulteriKapcsolo]
        self.kapcsolokAllapot = [False, False, False, False]
        self.ablakok = [self.nappaliAblak, self.haloAblak, self.konyhaAblak]
        self.ablakokAllapot = [False, False, False]

        self.label.place(x=0, y=0)
        self.homersekletLabel.place(relx=0.5625, rely=0.694)
        self.motionLabel.place(relx=0.4583, rely=0.4629)

        self.nappaliKapcsolo.place(relx=0.085, rely=0.230)
        self.haloKapcsolo.place(relx=0.639, rely=0.230)
        self.konyhaKapcsolo.place(relx=0.639, rely=0.587)
        self.kulteriKapcsolo.place(relx=0.930, rely=0.390)
        self.garazsKapcsolo.place(relx=0.0935, rely=0.569)
        self.nappaliAblak.place(relx=0.1423, rely=0.2203)
        self.haloAblak.place(relx=0.6947, rely=0.2203)
        self.konyhaAblak.place(relx=0.6947, rely=0.5750)
        self.wetLabel.place(relx=0.370, rely=0.8333)

#==================================================

    def toggle_villany(self, melyik):
        self.melyik = melyik

        self.i = 0
        while(self.melyik != self.kapcsolok[self.i]):
            self.i+=1

        if(self.fullscreenState == False):
            if(self.kapcsolokAllapot[self.i] == False):
                self.melyik.configure(image = self.villanyFelResizedKicsi)
                self.kapcsolokAllapot[self.i] = True
            else:
                self.melyik.configure(image = self.villanyLeResizedKicsi)
                self.kapcsolokAllapot[self.i] = False
        else:
            if(self.kapcsolokAllapot[self.i] == False):
                self.melyik.configure(image = self.villanyFelResizedNagy)
                self.kapcsolokAllapot[self.i] = True
            else:
                self.melyik.configure(image = self.villanyLeResizedNagy)
                self.kapcsolokAllapot[self.i] = False
        
        self.GPIOallitas()

    def buttonResize(self, melyiket):
        self.melyiket = melyiket
        self.j = 0
        while(self.melyiket != self.kapcsolok[self.j]):
            self.j+=1

        if (self.kapcsolokAllapot[self.j] == True):
            if (self.fullscreenState == True):
                self.melyiket.configure(image = self.villanyFelResizedNagy)
            else:
                self.melyiket.configure(image = self.villanyFelResizedKicsi)
        else:
            if (self.fullscreenState == True):
                self.melyiket.configure(image = self.villanyLeResizedNagy)
            else:
                self.melyiket.configure(image = self.villanyLeResizedKicsi)

#==================================================

    def toggle_garazs(self):
        self.garazsState = not self.garazsState

        if(self.garazsState == True):
            if(self.fullscreenState == True):
                self.garazsKapcsolo.configure(image = self.garazsOpenResizedNagy)
            else:
                self.garazsKapcsolo.configure(image = self.garazsOpenResizedKicsi)
        else:
            if(self.fullscreenState == True):
                self.garazsKapcsolo.configure(image = self.garazsCloseResizedNagy)
            else:
                self.garazsKapcsolo.configure(image = self.garazsCloseResizedKicsi)

    def garazsResize(self):
        if(self.garazsState == True):
            if (self.fullscreenState == True):
                self.garazsKapcsolo.configure(image = self.garazsOpenResizedNagy)
            else:
                self.garazsKapcsolo.configure(image = self.garazsOpenResizedKicsi)
        else:
            if (self.fullscreenState == True):
                self.garazsKapcsolo.configure(image = self.garazsCloseResizedNagy)
            else:
                self.garazsKapcsolo.configure(image = self.garazsCloseResizedKicsi)
        
#==================================================

    def windowResize(self, melyet):
        self.melyet = melyet
        self.k = 0
        while(self.melyet != self.ablakok[self.k]):
            self.k+=1

        if (self.ablakokAllapot[self.k] == True):
            if (self.fullscreenState == True):
                self.melyet.configure(image = self.ablakCloseResizedNagy)
            else:
                self.melyet.configure(image = self.ablakCloseResizedKicsi)
        else:
            if (self.fullscreenState == True):
                self.melyet.configure(image = self.ablakOpenResizedNagy)
            else:
                self.melyet.configure(image = self.ablakOpenResizedKicsi)

    def toggle_window(self, mely):
        self.mely = mely
        self.h = 0
        while(self.mely != self.ablakok[self.h]):
            self.h+=1

        if(self.ablakokAllapot[self.h] == True):
            if(self.fullscreenState == True):
                self.mely.configure(image = self.ablakCloseResizedNagy)
            else:
                self.mely.configure(image = self.ablakCloseResizedKicsi)
        else:
            if(self.fullscreenState == True):
                self.mely.configure(image = self.ablakOpenResizedNagy)
            else:
                self.mely.configure(image = self.ablakOpenResizedKicsi)

#==================================================

    def toggle_fullscreen(self, event=None):
        self.fullscreenState = not self.fullscreenState

        if(self.fullscreenState == False):
            self.label.configure(image = self.tervrajzFullscreenFele)
        else:
            self.label.configure(image = self.tervrajzFullscreen)

        self.buttonResize(self.nappaliKapcsolo)
        self.buttonResize(self.haloKapcsolo)
        self.buttonResize(self.konyhaKapcsolo)
        self.buttonResize(self.kulteriKapcsolo)
        self.garazsResize()
        self.windowResize(self.nappaliAblak)
        self.windowResize(self.haloAblak)
        self.windowResize(self.konyhaAblak)

        if(self.fullscreenState):
            gui.geometry(str(round(gui.winfo_screenwidth())) + "x" + str(round(gui.winfo_screenheight())))
        else:
            gui.geometry(str(round(gui.winfo_screenwidth() / 2)) + "x" + str(round(gui.winfo_screenheight() / 2)))

        gui.attributes("-fullscreen", self.fullscreenState)

        return "break"

    def exit_fullscreen(self, event=None):
        self.fullscreenState = False
        if(self.fullscreenState == False):
            self.label.configure(image = self.tervrajzFullscreenFele)
        else:
            self.label.configure(image = self.tervrajzFullscreen)

        self.buttonResize(self.nappaliKapcsolo)
        self.buttonResize(self.haloKapcsolo)
        self.buttonResize(self.konyhaKapcsolo)
        self.buttonResize(self.kulteriKapcsolo)
        self.garazsResize()
        self.windowResize(self.nappaliAblak)
        self.windowResize(self.haloAblak)
        self.windowResize(self.konyhaAblak)

        gui.geometry(str(round(gui.winfo_screenwidth() / 2)) + "x" + str(round(gui.winfo_screenheight() / 2)))
        gui.attributes("-fullscreen", False)
        return "break"

    def GPIOallitas(self):
        GPIO.output(nappali, self.kapcsolokAllapot[0])
        GPIO.output(haloszoba, self.kapcsolokAllapot[1])
        GPIO.output(konyha, self.kapcsolokAllapot[2])
        GPIO.output(kulteri, self.kapcsolokAllapot[3])
        
#==================================================

def szenzorok():
    # thread 1
    while True:
        temperature = 23#homSensor.get_temperature()
        app.tempVar.set(str(temperature) + " °C")

        vizerzekeloState = GPIO.input(vizerzekelo)
        if(vizerzekeloState == True):
            app.wetVar.set("Bepisiltem!")
            GPIO.output(vizerzekeloLampa, GPIO.HIGH)
        else:
            app.wetVar.set("")
            GPIO.output(vizerzekeloLampa, GPIO.LOW)
            
        fenyerossegState = GPIO.input(fenyerosseg)
        if(fenyerossegState == True):
            GPIO.output(kulteri, GPIO.HIGH)
            if(app.fullscreenState):
                app.kulteriKapcsolo.configure(image = app.villanyFelResizedNagy)
            else:
                app.kulteriKapcsolo.configure(image = app.villanyFelResizedKicsi)
        else:
            GPIO.output(kulteri, GPIO.LOW)
            if(app.fullscreenState):
                app.kulteriKapcsolo.configure(image = app.villanyLeResizedNagy)
            else:
                app.kulteriKapcsolo.configure(image = app.villanyLeResizedKicsi)
        
        gui.update()
        time.sleep(0.1)

def riaszto():
    # thread 2
    while True:
        riasztasState = GPIO.input(mozgaserzekelo)
        if(riasztasState == True):
            app.motionVar.set("RIASZTAS!")
            GPIO.output(riasztoLampa, GPIO.HIGH)
        else:
            app.motionVar.set("")
            GPIO.output(riasztoLampa, GPIO.LOW)
        
        gui.update()
        time.sleep(0.1)

def erzekelok():
    garazsLastState = True
    app.toggle_window(app.nappaliAblak)
    app.toggle_window(app.haloAblak)
    app.toggle_window(app.konyhaAblak)

    while True:
        garazsState = GPIO.input(garazsErzekelo)
        if(garazsState != garazsLastState):
            app.toggle_garazs()
            garazsLastState = garazsState

        nappaliState = GPIO.input(nappaliErzekelo)
        if(nappaliState != app.ablakokAllapot[0]):
            app.ablakokAllapot[0] = nappaliState
            app.toggle_window(app.nappaliAblak)

        haloState = GPIO.input(haloszobaErzekelo)
        if(haloState != app.ablakokAllapot[1]):
            app.ablakokAllapot[1] = haloState
            app.toggle_window(app.haloAblak)

        konyhaState = GPIO.input(konyhaErzekelo)
        if(konyhaState != app.ablakokAllapot[2]):
            app.ablakokAllapot[2] = konyhaState
            app.toggle_window(app.konyhaAblak)
            
        gui.update()
        time.sleep(0.1)

try:
    gui = Tk()
    app = Fullscreen_Window(gui)
    gui.geometry(str(round(gui.winfo_screenwidth() / 2)) + "x" + str(round(gui.winfo_screenheight() / 2)))
    gui.wm_title("Edu&Fun okoshaz")
    gui.attributes('-fullscreen', False)
    gui.resizable(0,0)

    thread1 = threading.Thread(target=szenzorok)
    thread1.daemon = True
    thread1.start()
    print("A thread 1 elindult")

    thread2 = threading.Thread(target=riaszto)
    thread2.daemon = True
    thread2.start()
    print("A thread 2 elindult")

    thread3 = threading.Thread(target=erzekelok)
    thread3.daemon = True
    thread3.start()
    print("A thread 3 elindult")
except:
    print("Thread eleg ritkasan(nem) indult el")

gui.mainloop()
os._exit(1)