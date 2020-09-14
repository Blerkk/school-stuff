import requests
from bs4 import BeautifulSoup
import smtplib

URL = 'https://www.arukereso.hu/videokartya-c3142/asus/radeon-rx-5700-rog-strix-xt-oc-8gb-gddr6-256bit-rog-strix-rx5700xt-o8g-gaming-p496372299/'

headers = {"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.119 Safari/537.36'}

page = requests.get(URL, headers=headers)

soup = BeautifulSoup(page.content, 'html.parser')

def kulgyEmail():
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('bagdimate@gmail.com', 'uzcxtaufbekxowcw')

    subject = 'Lejebb ment az ara a karytanak!'
    body = 'Link a termekhez: ' + URL

    msg = f"Subject: {subject}\n\n{body}"

    server.sendmail('bagdimate@gmail.com', 'bagdimate@gmail.com', msg)
    print("Ment az e-mail, paraszt")

    server.quit()

def arEllenorzes():
    price = soup.find(itemprop="lowPrice").get_text()
    priceConverted = price[0:3]
    priceConverted2 = price[4:7]
    priceConverted3 = priceConverted + priceConverted2
    priceNagyonConverted = int(priceConverted3)

    if(priceNagyonConverted < 160000):
        kulgyEmail()

    print(priceNagyonConverted)

arEllenorzes()