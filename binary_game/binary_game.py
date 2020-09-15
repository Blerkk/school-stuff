from PIL import ImageGrab
from PIL import Image
import numpy as np
import cv2
import time
import pyautogui

#for i in list(range(4)) [::-1]:
#    print(i+1)
#    time.sleep(1)

# pyautogui.keyDown('w') #"megnyomja a 'w'-t
# pyautogui.keyUp('w') #"felengedi" a 'w'-t

# |    256    |    128    |    64    |    32    |    16    |    8    |    4    |    2    |    0    |

def main():
    #last_time = time.time()
    while True:
        x= 334 
        y= 906
        #x, y koordianatai az ablak bal sarkanak
        offx = 849
        offy = 95
        #x, y koordinatai az ablak felbontasanak
        screen = ImageGrab.grab(bbox=(x , y, x + offx, y + offy))
        screen = cv2.cvtColor(np.array(screen), cv2.COLOR_BGR2RGB) #BGR-rol konvertalas RGB-re

        #print('Loop took {} seconds'.format(time.time()-last_time))
        #last_time = time.time()

        cv2.imshow('window', screen)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break

if __name__ == '__main__':
    main()