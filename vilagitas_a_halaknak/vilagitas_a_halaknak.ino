#include "RTClib.h"
#include <LiquidCrystal.h>
#include <ezButton.h>

LiquidCrystal lcd = LiquidCrystal(2, 3, 4, 5, 6, 7);

RTC_DS1307 rtc;

ezButton GombFel(8);
ezButton GombLe(9);
ezButton GombKovetkezo(10);
ezButton GombElozo(11);

struct Time {
     int hour;
     int minute;
};

struct Color {
     int r;
     int g;
     int b;
};

struct Page {
     int ButtonState;
     Time time;
     Color color;
};

Page page[3];

int currentPage = 0;

void setup () {
     lcd.begin(16, 2);
     Serial.begin(57600);

     GombFel.setDebounceTime(50);
     GombLe.setDebounceTime(50);
     GombKovetkezo.setDebounceTime(50);
     GombElozo.setDebounceTime(50);

     if (! rtc.begin()) {
          Serial.println("Couldn't find RTC");
          Serial.flush();
          abort();
     }

     if (! rtc.isrunning()) {
          Serial.println("RTC is NOT running, let's set the time!");
          rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
     }

     //1. oldal
     page[0].time.hour = 8;
     page[0].time.minute = 35;

     page[0].color.r = 255;
     page[0].color.g = 0;
     page[0].color.b = 0;

     //2. oldal
     page[1].time.hour = 12;
     page[1].time.minute = 23;

     page[1].color.r = 0;
     page[1].color.g = 255;
     page[1].color.b = 0;

     //3. oldal
     page[2].time.hour = 18;
     page[2].time.minute = 45;

     page[2].color.r = 0;
     page[2].color.r = 0;
     page[2].color.b = 255;  
}

void loop () {
     DateTime now = rtc.now();
     String pontosIdo = String(now.timestamp(DateTime::TIMESTAMP_TIME));
     Serial.println(pontosIdo);

     GombFel.loop();
     GombLe.loop();
     GombKovetkezo.loop();
     GombElozo.loop();

     if (page[currentPage].ButtonState > 4) {
          page[currentPage].ButtonState = 0;
          currentPage++;
     }

     if (page[currentPage].ButtonState < 0) {
          page[currentPage].ButtonState = 4;
          currentPage--;
     }

     if (currentPage > 2) {
          currentPage = 0;
     }

     if (currentPage < 0) {
          currentPage = 2;
     }

     if (GombKovetkezo.isPressed()) {
          page[currentPage].ButtonState++;
     }

     if (GombElozo.isPressed()) {
          page[currentPage].ButtonState--;
     }

     switch (page[currentPage].ButtonState) {
          case 0:
               //ora
               if (GombFel.isPressed()) {
                    page[currentPage].time.hour++;
               }

               if (GombLe.isPressed()) {
                    page[currentPage].time.hour--;
               }
          
               if (page[currentPage].time.hour > 23) {
                    page[currentPage].time.hour = 00;
               }
          
               if (page[currentPage].time.hour < 00) {
                    page[currentPage].time.hour = 23;
               }
               break;
          case 1:
               //perc
               if (GombFel.isPressed()) {
                    page[currentPage].time.minute++;
               }
          
               if (GombLe.isPressed()) {
                    page[currentPage].time.minute--;
               }
          
               if (page[currentPage].time.minute > 59) {
                    page[currentPage].time.minute = 00;
               }
          
               if (page[currentPage].time.minute < 00) {
                    page[currentPage].time.minute = 59;
               }
               break;
          case 2:
               //r
               if (GombFel.isPressed()) {
                    page[currentPage].color.r++;
               }
          
               if (GombLe.isPressed()) {
                    page[currentPage].color.r--;
               }
          
               if (page[currentPage].color.r > 255) {
                    page[currentPage].color.r = 0;
               }
          
               if (page[currentPage].color.r < 00) {
                    page[currentPage].color.r = 255;
               }
               break;
          case 3:
               //g
               if (GombFel.isPressed()) {
                    page[currentPage].color.g++;
               }
          
               if (GombLe.isPressed()) {
                    page[currentPage].color.g--;
               }
          
               if (page[currentPage].color.g > 255) {
                    page[currentPage].color.g = 0;
               }
          
               if (page[currentPage].color.g < 00) {
                    page[currentPage].color.g = 255;
               }
               break;
          case 4:
               //b
               if (GombFel.isPressed()) {
                    page[currentPage].color.b++;
               }
     
               if (GombLe.isPressed()) {
                    page[currentPage].color.b--;
               }
     
               if (page[currentPage].color.b > 255) {
                    page[currentPage].color.b = 0;
               }
     
               if (page[currentPage].color.b < 00) {
                    page[currentPage].color.b = 255;
               }
               break;
     }

     for(int i = 0;i < 3; i++) { 
          if(pontosIdo == String(page[i].time.hour) + ":" + String(page[i].time.minute) + ":00") {
               Serial.println();
               Serial.print(page[i].color.r);
               Serial.print(", ");
               Serial.print(page[i].color.g);
               Serial.print(", ");
               Serial.print(page[i].color.b);
               Serial.println();
          }
     }
     
     lcd.setCursor(0, 0);
     lcd.print(String(currentPage + 1) + ".idopont: " + convertStringTime(String(page[currentPage].time.hour)) + ":" + convertStringTime(String(page[currentPage].time.minute)));
     lcd.setCursor(0, 1);
     lcd.print("szin:" + String(page[currentPage].color.r) + " " + String(page[currentPage].color.g) + " " + String(page[currentPage].color.b));
}

String convertStringTime(String t) {
     String str = "";

     if (atoi(t.c_str()) < 10) {
          str = "0";
     }
     return str + t;
}
