from time import *
import threading
#import RPi.GPIO as GPIO

kicsengo = 11
becsengo = 12
jelzocsengo = 13
pontosIdo = ""
maiNap = ""
hetfo = "Monday"
kedd = "Tuesday"
szerda = "Wednesday"
csutortok = "Thursday"
pentek = "Friday"
newNapok = [hetfo, kedd, szerda, csutortok, pentek] 

class Napok:
    nap = maiNap

napok = [Napok() for i in range(5)]
napok[0].nap = hetfo
napok[1].nap = kedd
napok[2].nap = szerda
napok[3].nap = csutortok
napok[4].nap = pentek

#GPIO.setmode(GPIO.BOARD)
#GPIO.setup(kicsengo, GPIO.OUT)
#GPIO.setup(becsengo, GPIO.OUT)
#GPIO.setup(jelzocsengo, GPIO.OUT)

def idoUpdate():
    global pontosIdo 
    global maiNap
    pontosIdo = strftime('%H:%M')
    maiNap = strftime('%A')

def csengetesValasztas(nap, action, mikor): #(nap, (kicsengo, becsengo, jelzocsengo), 'idopont' )
    global pontosIdo
    global maiNap
    global newAction
    global newMikor
    global newNap
    newAction = action
    newMikor = mikor
    newNap = nap

    for i in range(5):
        if(maiNap in napok[i].nap):
            if(newNap == maiNap): #if(napok[i].nap == maiNap):          #ha a hetfo az a mai nap7                
                if(newMikor == str(pontosIdo)):
                    #GPIO.output(action, GPIO.HIGH)
                    print('\nMost kapcsol BE a csengo a {} pin-en.'.format(newAction))
                    sleep(3)
                    #GPIO.output(action, GPIO.LOW)
                    print('\nMost kapcsol KI a csengo {} pin-en.'.format(newAction))
    return newNap, newAction, newMikor

def t1():
    while True:
        #1.ora
        csengetesValasztas(hetfo, jelzocsengo, '8:13') #ha a hetfo az a mai nap
        csengetesValasztas(hetfo, becsengo, '8:15')
        csengetesValasztas(hetfo, kicsengo, '9:10')
        #2.ora
        csengetesValasztas(hetfo, jelzocsengo, '9:17')
        csengetesValasztas(hetfo, becsengo, '9:20')
        csengetesValasztas(hetfo, kicsengo, '10:05')


def t2():
    while True:
        idoUpdate()

try:
    thread1 = threading.Thread(target=t1)
    thread1.daemon = False
    thread1.start()
    print("\r\nA thread 1 elindult")

    thread2 = threading.Thread(target=t2)
    thread2.daemon = False
    thread2.start()
    print("\r\nA thread 2 elindult")

except:
    print("Thread eleg ritkasan(nem) indult el")