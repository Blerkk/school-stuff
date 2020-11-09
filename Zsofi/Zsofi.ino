#include <LiquidCrystal.h>
#include <ezButton.h>

LiquidCrystal lcd = LiquidCrystal(12, 11, 5, 4, 3, 2);

ezButton kovetkezo(7);
bool szovegCsere = false;
String torles = "                ";

void setup () {
    lcd.begin(16, 2);
    Serial.begin(57600);
    kovetkezo.setDebounceTime(50);
}

void loop () {
    kovetkezo.loop();

    if(szovegCsere == false) {
        if(kovetkezo.isPressed()){
            szovegCsere = true;
            //lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(torles);
            lcd.setCursor(0, 1);
            lcd.print(torles);
            Serial.println("sz. nap-ra cserelve");
        }

        Serial.println("sz. nap");
        lcd.setCursor(0, 0);
        lcd.print("Happy birthday,");
        lcd.setCursor(0, 1);
        lcd.print("szerelmem! <3");
        delay(50);
    }
    else if(szovegCsere == true) {
        if(kovetkezo.isPressed()){
            szovegCsere = false;
            //lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(torles);
            lcd.setCursor(0, 1);
            lcd.print(torles);
            Serial.println("dugasra cserelve");
        }

        Serial.println("dugas");
        lcd.setCursor(0, 0);
        lcd.print("ummm... dugunk?");
        lcd.setCursor(0, 1);
        lcd.print("legyszi? haha");
        delay(50);
    }

//    for (int positionCounter = 0; positionCounter < 13; positionCounter++) {
//        lcd.scrollDisplayLeft();
//        delay(400);
//    }
}
