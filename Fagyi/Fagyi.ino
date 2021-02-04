#include <LiquidCrystal.h>

LiquidCrystal lcd = LiquidCrystal(12, 11, 5, 4, 3, 2);

const int buttonPin = 8;

int buttonState = 0;     // current state of the button
int lastButtonState = 0; // previous state of the button
int startPressed = 0;    // the moment the button was pressed
int endPressed = 0;      // the moment the button was released
int holdTime = 0;        // how long the button was hold
int idleTime = 0;        // how long the button was idle
int seconds = 0;

void setup()
{
  lcd.begin(16, 2);
  pinMode(buttonPin, INPUT);
  Serial.begin(57600);
}

void loop()
{
  buttonState = digitalRead(buttonPin);

  updateState();


  if(seconds < 3)
  {
    Serial.println("Nyomja meg a fagyi adagolashoz");

    lcd.setCursor(0, 0);
    lcd.print("Kezdheti a fagyi ");
    lcd.setCursor(0, 1);
    lcd.print("adagolasat       ");
  }
  else if(seconds == 3)
  {
    Serial.println("1 adag fagyi -350Ft");

    lcd.setCursor(0, 0);
    lcd.print("1 adag fagyi     ");
    lcd.setCursor(0, 1);
    lcd.print("-350Ft           ");
  }
  else if(seconds == 6)
  {
    Serial.println("2 adag fagyi -700Ft");

    lcd.setCursor(0, 0);
    lcd.print("2 adag fagyi     ");
    lcd.setCursor(0, 1);
    lcd.print("-700Ft           ");
  }
  else if(seconds == 9)
  {
    Serial.println("3 adag fagyi -950Ft");

    lcd.setCursor(0, 0);
    lcd.print("3 adag fagyi     ");
    lcd.setCursor(0, 1);
    lcd.print("-950Ft           ");
  }
  else if(seconds == 12)
  {
    Serial.println("3 adag fagyi -1300Ft");

    lcd.setCursor(0, 0);
    lcd.print("4 adag fagyi     ");
    lcd.setCursor(0, 1);
    lcd.print("-1300Ft          ");
  }
  else if(seconds == 15)
  {
    Serial.println("Oblites tortenik");

    lcd.setCursor(0, 0);
    lcd.print("Oblites tortenik ");
    lcd.setCursor(0, 1);
    lcd.print("-----------------");
    //
    delay(3000);
    //
    Serial.println("Oblites vege");

    lcd.setCursor(0, 0);
    lcd.print("Oblites vege     ");
    lcd.setCursor(0, 1);
    lcd.print("-----------------");

  }
}

void updateState()
{
  if (buttonState == HIGH)
  {
    seconds++;
    delay(1000);
  }
  if (buttonState == LOW)
  {
    seconds = 0;
    delay(1000);
  }
}
