import sys
from tkinter import *
from PIL import Image, ImageTk
# import RPi.GPIO as GPIO
# import bme280

# temperature = bme280.readBME280All()

# GPIO.setmode(GPIO.BOARD)
# GPIO.setwarnings(False)
# #Haloszoba lampa
# haloszoba = 7
# GPIO.setup(haloszoba, GPIO.OUT)
# #Konyha lampa
# konyha = 11
# GPIO.setup(konyha, GPIO.OUT)
# #Nappali lampa
# nappali = 12
# GPIO.setup(nappali, GPIO.OUT)
# #Kulteri lampa
# kulteri = 13
# GPIO.setup(kulteri, GPIO.OUT)
# #mozgaserzekelo riasztas
# mozgaserzekelo = 15
# GPIO.setup(mozgaserzekelo, GPIO.OUT)
# #viz a pinceben risztas
# vizerzekelo = 16
# GPIO.setup(vizerzekelo, GPIO.OUT)

class Fullscreen_Window(Frame):
    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.master = master
        self.fullscreenState = False
        self.villanyState = False
        gui.bind("<f>", self.toggle_fullscreen)
        gui.bind("<Escape>", self.exit_fullscreen)

        self.hatterkep = Image.open("img/bg.png")
        self.villanyLe = Image.open("img/lightbulb_le.png")
        self.villanyFel = Image.open("img/lightbulb_fel.png")

        self.fullscreen_hatterkep_fele = self.hatterkep.resize((round(gui.winfo_screenwidth() / 2), round(gui.winfo_screenheight() / 2)))
        self.fullscreen_hatterkep = self.hatterkep.resize((gui.winfo_screenwidth(),gui.winfo_screenheight()))
        self.resized_villany_le_kicsi = self.villanyLe.resize((50,50), Image.ANTIALIAS)
        self.resized_villany_fel_kicsi = self.villanyFel.resize((50,50), Image.ANTIALIAS)
        self.resized_villany_le_nagy = self.villanyLe.resize((100,100), Image.ANTIALIAS)
        self.resized_villany_fel_nagy = self.villanyFel.resize((100,100), Image.ANTIALIAS)

        self.tervrajzFullscreenFele = ImageTk.PhotoImage(self.fullscreen_hatterkep_fele)
        self.tervrajzFullscreen = ImageTk.PhotoImage(self.fullscreen_hatterkep)
        self.villanyLeResizedKicsi = ImageTk.PhotoImage(self.resized_villany_le_kicsi)
        self.villanyFelResizedKicsi = ImageTk.PhotoImage(self.resized_villany_fel_kicsi)
        self.villanyLeResizedNagy = ImageTk.PhotoImage(self.resized_villany_le_nagy)
        self.villanyFelResizedNagy = ImageTk.PhotoImage(self.resized_villany_fel_nagy)

        self.label = Label(image = self.tervrajzFullscreenFele) # -Fele
        self.nappaliKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.nappaliKapcsolo))
        self.haloKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.haloKapcsolo))
        self.konyhaKapcsolo = Button(image  =self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.konyhaKapcsolo))
        self.kulteriKapcsolo = Button(image = self.villanyLeResizedKicsi, border = 0, borderwidth = 0, background = "black", activebackground = "black", command = lambda: self.toggle_villany(self.kulteriKapcsolo))

        self.kapcsolok = [self.nappaliKapcsolo, self.haloKapcsolo, self.konyhaKapcsolo, self.kulteriKapcsolo]
        self.kapcsolokAllapot = [False, False, False, False]

        self.label.place(x=0, y=0)

        self.nappaliKapcsolo.place(relx=0.085, rely=0.230)
        self.haloKapcsolo.place(relx=0.640, rely=0.230)
        self.konyhaKapcsolo.place(relx=0.640, rely=0.587)
        self.kulteriKapcsolo.place(relx=0.930, rely=0.387)

    def toggle_villany(self, melyik):
        self.villanyState = not self.villanyState
        self.melyik = melyik

        self.i = 0
        while(self.melyik != self.kapcsolok[self.i]):
            self.i+=1

        if(self.fullscreenState == False):
            if(self.villanyState == True):
                self.melyik.configure(image = self.villanyFelResizedKicsi)
                self.kapcsolokAllapot[self.i] = True
            else:
                self.melyik.configure(image = self.villanyLeResizedKicsi)
                self.kapcsolokAllapot[self.i] = False
        else:
            if(self.villanyState == True):
                self.melyik.configure(image = self.villanyFelResizedNagy)
                self.kapcsolokAllapot[self.i] = True
            else:
                self.melyik.configure(image = self.villanyLeResizedNagy)
                self.kapcsolokAllapot[self.i] = False

#==================================================

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

        gui.attributes("-fullscreen", self.fullscreenState)
        return "break"

    def exit_fullscreen(self, event=None):
        self.fullscreenState = False
        self.label.configure(image = self.tervrajzFullscreenFele)

        gui.attributes("-fullscreen", False)
        return "break"

if __name__ == '__main__':
    gui = Tk()
    app = Fullscreen_Window(gui)
    gui.geometry(str(round(gui.winfo_screenwidth() / 2)) + "x" + str(round(gui.winfo_screenheight() / 2)))
    gui.wm_title("Edu&Fun okoshaz")
    gui.resizable(0,0)
    gui.mainloop()