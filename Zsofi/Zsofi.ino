#include <LiquidCrystal.h>
#include <ezButton.h>

LiquidCrystal lcd = LiquidCrystal(12, 11, 5, 4, 3, 2);

ezButton kovetkezo(8);
bool szovegCsere = false;

void setup () {
    lcd.begin(16, 2);
    Serial.begin(57600);
    kovetkezo.setDebounceTime(50);
}

void loop () {
    kovetkezo.loop();

    if(szovegCsere == false) {
        if(kovetkezo.isPressed(){
            szovegCsere = true;
        }

        lcd.setCursor(0, 0);
        lcd.print("Boldog szuletesnapot szerelmem!");
        lcd.setCursor(0, 1);
        lcd.print("Hope you have a wonderful time.");
    }
    else if(szovegCsere == true) {
        if(kovetkezo.isPressed(){
            szovegCsere = false;
        }

        lcd.setCursor(0, 0);
        lcd.print("ummm... dugunk?");
        lcd.setCursor(0, 1);
        lcd.print("legyszi?");
    }

    for (int positionCounter = 0; positionCounter < 13; positionCounter++) {
        lcd.scrollDisplayLeft();
        delay(400);
    }
}
