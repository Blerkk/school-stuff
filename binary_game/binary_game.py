from PIL import ImageGrab
from PIL import Image
import numpy as np
import threading
import pyautogui
import cv2
import time

# for i in list(range(4)) [::-1]:                                       # 4 seces visszaszamolas indulasig
#    print(i+1)
#    time.sleep(1)

# pyautogui.keyDown('w')                                                # "megnyomja a 'w'-t
# pyautogui.keyUp('w')                                                  # "felengedi" a 'w'-t

#####
# Ez majd kelleni fog, hogy atlassam a szamrendszert xd

# |    256    |    128    |    64    |    32    |    16    |    8    |    4    |    2    |    0    |

#####

def main():
    #last_time = time.time()
    while True:
        x= 334                                                          #x, y koordianatai az ablak bal sarkanak
        y= 906
        offx = 849                                                      #x, y koordinatai az ablak felbontasanak
        offy = 95
        screen = ImageGrab.grab(bbox=(x , y, x + offx, y + offy))
        screen = cv2.cvtColor(np.array(screen), cv2.COLOR_BGR2RGB)      #BGR-rol konvertalas RGB-re

        #print('Loop took {} seconds'.format(time.time()-last_time))
        #last_time = time.time()

        cv2.imshow('window', screen)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break

if __name__ == '__main__':
    main()

    # try:
    #     thread1 = threading.Thread(target=t1)
    #     thread1.daemon = True
    #     thread1.start()
    #     print("A thread 1 elindult")
    # except:
    #     print("Thread eleg ritkasan(nem) indult el")




















































# class Cucc:
#     def __init__(self):
#         # 
#     def dolog(self):
#         # 

# cucc = Cucc()

# def t1():
#     while True:
#         cucc.dolog()

# try:
#     thread1 = threading.Thread(target=t1)
#     thread1.daemon = True
#     thread1.start()
#     print("A thread 1 elindult")
# except:
#     print("Thread eleg ritkasan(nem) indult el")