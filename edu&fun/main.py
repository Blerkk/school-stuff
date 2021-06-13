#piton kod innen van lopva
##########
#https://www.e-tinkers.com/2018/04/how-to-control-raspberry-pi-gpio-via-http-web-server/
##########

import RPi.GPIO as GPIO
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import bme280
import threading

host_name = '192.168.0.114'    # Change this to your Raspberry Pi IP address
host_port = 8000

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
#Haloszoba lampa
haloszoba = 7
GPIO.setup(haloszoba, GPIO.OUT)
#Konyha lampa
konyha = 11
GPIO.setup(konyha, GPIO.OUT)
#Nappali lampa
nappali = 12
GPIO.setup(nappali, GPIO.OUT)
#Kulteri lampa
kulteri = 13
GPIO.setup(kulteri, GPIO.OUT)
#mozgaserzekelo riasztas
mozgaserzekelo = 15
GPIO.setup(mozgaserzekelo, GPIO.OUT)
#viz a pinceben risztas
vizerzekelo = 16
GPIO.setup(vizerzekelo, GPIO.OUT)

#kiolvassa a homersekletet majd azt beirja a file-ba
def tempInFile():
    temperature = bme280.readBME280All()
    tempFile = open("pitemp.txt", "w")
    tempFile.write(temperature)
    tempFile.close()

class MyServer(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):

        #ennek a helyere kell majd bevarazsolni azt a html file-t ami ott van mellekelve a mappaba
        html = '''
            <html>
            <body style="width:960px; margin: 20px auto;">
            <h1>Welcome to my Raspberry Pi</h1>
            <p>Current GPU temperature is {}</p>
            <p>Turn LED: <a href="/on">On</a> <a href="/off">Off</a></p>
            <div id="led-status"></div>
            <script>
                document.getElementById("led-status").innerHTML="{}";
            </script>
            </body>
            </html>
        '''
        temp = os.popen("/opt/vc/bin/vcgencmd measure_temp").read()
        self.do_HEAD()
                status = ''

        #ha minden igaz akkor ezek kapcsoljak a ledeket
        if(self.path=='/'):
            status=''
        elif(self.path=='/haloszobaOn'):
            GPIO.output(haloszoba, GPIO.HIGH)
            status='haloszobaOn'
        elif(self.path=='/haloszobaOff'):
            GPIO.output(haloszoba, GPIO.LOW)
            status='haloszobaOff'

        elif(self.path=='/nappaliOn'):
            GPIO.output(haloszoba, GPIO.HIGH)
            status='nappaliOn'
        elif(self.path=='/nappaliOff'):
            GPIO.output(haloszoba, GPIO.LOW)
            status='nappaliOff'

        elif(self.path=='/konyhaOn'):
            GPIO.output(haloszoba, GPIO.HIGH)
            status='konyhaOn'
        elif(self.path=='/konyhaOff'):
            GPIO.output(haloszoba, GPIO.LOW)
            status='konyhaOff'

        elif(self.path=='/kulteriOn'):
            GPIO.output(haloszoba, GPIO.HIGH)
            status='kulteriOn'
        elif(self.path=='/kulteriOff'):
            GPIO.output(haloszoba, GPIO.LOW)
            status='kulteriOff'

        self.wfile.write(html.format(temp[5:], status).encode("utf-8"))

#szerver futtatasert felelos thread
def t1():
    http_server = HTTPServer((host_name, host_port), MyServer)
    print("Server Starts - %s:%s" % (host_name, host_port))

    try:
        http_server.serve_forever()
    except KeyboardInterrupt:
        http_server.server_close()

#ez a thread olvassa a homerseklet szenzord majd irja fileba, ha minden igaz
#ebbol a filebol kene beolvasni az adatot javascriptel, majd azt a javascript-nek az beolvasott adatat a homero-nek at passelni
def t2():
    while True:
        tempInFile()

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

os._exit(1)