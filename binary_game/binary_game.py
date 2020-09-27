from PIL import ImageGrab
from PIL import Image
import numpy as np
import pytesseract
import threading
import pyautogui
import cv2
import time
import os
import sys

global kikapcs
kikapcs = False

pytesseract.pytesseract.tesseract_cmd = 'C:\\Users\\Blerkk\\AppData\\Local\\Tesseract-OCR\\tesseract.exe'

# for i in list(range(4)) [::-1]:                                       # 4 seces visszaszamolas indulasig
#    print(i+1)
#    time.sleep(1)

# pyautogui.keyDown('w')                                                # "megnyomja a 'w'-t
# pyautogui.keyUp('w')                                                  # "felengedi" a 'w'-t

#####
# Ez majd kelleni fog, hogy atlassam a szamrendszert xd

# |    256    |    128    |    64    |    32    |    16    |    8    |    4    |    2    |    0    |

#####

class Window:
    def __init__(self):
        self.last_time = time.time()
        self.x= 379                                                          #x, y koordianatai az ablak bal sarkanak
        self.y= 918
        self.offx = 830                                                     #x, y koordinatai az ablak felbontasanak
        self.offy = 80
        self.lower_range_green = np.array([25, 52, 72]) #BGR 110,190,74,    251,171,24
        self.upper_range_green = np.array([102, 255, 255])
        self.lower_range_orange = np.array([14,171,251])
        self.upper_range_orange = np.array([255, 128, 0])

    def update(self):
        global kikapcs
        self.screen = ImageGrab.grab(bbox=(self.x , self.y, self.x + self.offx, self.y + self.offy))
        self.rgb = cv2.cvtColor(np.array(self.screen), cv2.COLOR_BGR2RGB)      #BGR-rol konvertalas RGB-re
        self.hsv = cv2.cvtColor(np.array(self.screen), cv2.COLOR_BGR2HSV)
        self.mask = cv2.inRange(self.hsv, self.lower_range_green, self.upper_range_green)
        print(pytesseract.image_to_string(self.mask))

        #print('A loop {} masodpercig tartott'.format(time.time()-self.last_time))
        #self.last_time = time.time()

        cv2.imshow('Detected', np.array(self.mask))
        if cv2.waitKey(25) & 0xFF == ord('q'):
            kikapcs = True
            cv2.destroyAllWindows()

window = Window()

def t1():
    global kikapcs
    if kikapcs == False:
        while True:
            window.update()
            if kikapcs == True:
                break
    else:
        kikapcs = True

def t2():
    while True:
        barna = 1
        lila = 2
        barna + lila

try:
    thread1 = threading.Thread(target=t1)
    thread1.daemon = False
    thread1.start()
    print("A thread 1 elindult")
    thread2 = threading.Thread(target=t2)
    thread2.daemon = False
    thread2.start()
    print("A thread 2 elindult")
except:
    print("Thread eleg ritkasan(nem) indult el")




























































# def main():
#     #last_time = time.time()
#     while True:
#         x= 334                                                          #x, y koordianatai az ablak bal sarkanak
#         y= 906
#         offx = 849                                                      #x, y koordinatai az ablak felbontasanak
#         offy = 95
#         screen = ImageGrab.grab(bbox=(x , y, x + offx, y + offy))
#         screen = cv2.cvtColor(np.array(screen), cv2.COLOR_BGR2RGB)      #BGR-rol konvertalas RGB-re

#         #print('Loop took {} seconds'.format(time.time()-last_time))
#         #last_time = time.time()

#         cv2.imshow('window', screen)
#         if cv2.waitKey(25) & 0xFF == ord('q'):
#             cv2.destroyAllWindows()
#             break

# if __name__ == '__main__':
#     main()

    # try:
    #     thread1 = threading.Thread(target=t1)
    #     thread1.daemon = True
    #     thread1.start()
    #     print("A thread 1 elindult")
    # except:
    #     print("Thread eleg ritkasan(nem) indult el")