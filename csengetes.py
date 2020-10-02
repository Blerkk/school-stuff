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


#
# 1.ora 7:30 becsengo - 8:15 kicsengo
# 2.ora 8:25 becsengo - 9:10 kicsengo
# 3.ora 9:20 becsengo - 10:05 kicsengo
# 4.ora 10:20 becsengo - 11:05 kicsengo
# 5.ora 11:15 becsengo - 12:00 kicsengo
# 6.ora 12:15 becsengo - 13:00 kicsengo
# 7.ora 13:15 becsengo - 14:00 kicsengo
# 8.ora 14:10 becsengo - 14:55 kicsengo
# 9.ora 15:00 becsengo - 14:45 kicsengo
#

#GPIO.setmode(GPIO.BOARD)
#GPIO.setup(kicsengo, GPIO.OUT)
#GPIO.setup(becsengo, GPIO.OUT)
#GPIO.setup(jelzocsengo, GPIO.OUT)

def idoUpdate():
    global pontosIdo 
    global maiNap
    pontosIdo = strftime('%H:%M:%S')
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
            if(napok[i].nap == maiNap):
                if(newMikor == str(pontosIdo)):
                    #GPIO.output(action, GPIO.HIGH)
                    print('\nmost kapcsol BE a csengo {}'.format(pontosIdo))
                    sleep(3)
                    ##GPIO.output(action, GPIO.LOW)
                    print('\nmost kapcsol KI a csengo {}'.format(pontosIdo))
        sleep(3)
        #sleep(12.0 * 60.0 * 60.0) //12 oras sleep lol

    return newNap, newAction, newMikor

def t1():
    while True:
        #1.ora
        csengetesValasztas(hetfo, jelzocsengo, '8:13:00')
        csengetesValasztas(hetfo, becsengo, '8:15:00')
        csengetesValasztas(hetfo, kicsengo, '9:10:00')


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