#include <OneWire.h>
#include <DallasTemperature.h>
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#define FIREBASE_HOST "patakysmarthome.firebaseio.com"
#define FIREBASE_AUTH "iNiK1WsWRSWuxzMaeUN64R6c01C5Td016oTpfzFP"
#define WIFI_SSID "Mark"
#define WIFI_PASSWORD "Buksi1022"
#define ONE_WIRE_BUS 4
FirebaseData firebaseData;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

int HOM_CYCLE = 0;

//HALO VÁLTOZÓK
//ABLAK:
const int H_ABLAK_PIN = 5;
bool H_ABLAK = false;
bool H_ABLAK_H = true;
//LÁMPA:
const int H_LAMPA_PIN = 2; //Lámpa (KIMENET)
const int H_LAMPAKAPCS_PIN = 0; //Kapcsoló (BEMENET)
volatile bool H_LAMPA_FEL = false; //TRUE ha gombal lett fel vagy le kapcsolva
volatile bool H_LAMPA = false; //Lámpa ki vagy be
volatile long H_LAMPA_TIMER = 0; //Prell
//HŐMÉRSÉKLET:
double H_HOM = 0;
double H_HOM_H = 100;



//FURDO VÁLTOZÓK
//ABLAK:
const int F_ABLAK_PIN = 13;
bool F_ABLAK = false;
bool F_ABLAK_H = true;
//LÁMPA:
const int F_LAMPA_PIN = 12; //Lámpa (KIMENET)
const int F_LAMPAKAPCS_PIN = 14; //Kapcsoló (BEMENET)
volatile bool F_LAMPA_FEL = false; //TRUE ha gombal lett fel vagy le kapcsolva
volatile bool F_LAMPA = false; //Lámpa ki vagy be
volatile long F_LAMPA_TIMER = 0; //Prell
//HŐMÉRSÉKLET:
double F_HOM = 0;
double F_HOM_H = 100;



//HALO FUNCTIONOK ÉS INTERRUPTOK
//ABLAK:
void H_ABLAK_FUNC(){
  H_ABLAK = digitalRead(H_ABLAK_PIN);
  if(H_ABLAK != H_ABLAK_H){
    if(Firebase.setBool(firebaseData, "/HALO/WINDOW", H_ABLAK));
    H_ABLAK_H = H_ABLAK;
  }
}
//LÁMPA:
    //INTERRUPT
void H_LAMPAKAPCS_FUNC(){
  if(H_LAMPA_TIMER < millis()-250 || H_LAMPA_TIMER > millis()){
    H_LAMPA = !H_LAMPA;
    digitalWrite(H_LAMPA_PIN, H_LAMPA);
    H_LAMPA_TIMER = millis();
    H_LAMPA_FEL = true;
  }
}
    //LEKÉRDEZÉS
void H_LAMPA_FUNC(){
  if(H_LAMPA_FEL == false){
    if(Firebase.getBool(firebaseData, "/HALO/LAMP")){
      if(firebaseData.dataType() == "boolean"){
        if(H_LAMPA_FEL == false){
          H_LAMPA = firebaseData.boolData();
          digitalWrite(H_LAMPA_PIN, H_LAMPA);
        }
      }
    }
  }
}
    //FELTÖLTÉS
void H_LAMPA_FEL_FUNC(){
  if(Firebase.setBool(firebaseData, "/HALO/LAMP", H_LAMPA));
  H_LAMPA_FEL = false;
}



//FURDO FUNCTIONOK ÉS INTERRUPTOK
//ABLAK:
void F_ABLAK_FUNC(){
  F_ABLAK = digitalRead(F_ABLAK_PIN);
  if(F_ABLAK != F_ABLAK_H){
    if(Firebase.setBool(firebaseData, "/FURDO/WINDOW", F_ABLAK));
    F_ABLAK_H = F_ABLAK;
  }
}
//LÁMPA:
    //INTERRUPT
void F_LAMPAKAPCS_FUNC(){
  if(F_LAMPA_TIMER < millis()-250 || F_LAMPA_TIMER > millis()){
    F_LAMPA = !F_LAMPA;
    digitalWrite(F_LAMPA_PIN, F_LAMPA);
    F_LAMPA_TIMER = millis();
    F_LAMPA_FEL = true;
  }
}
    //LEKÉRDEZÉS
void F_LAMPA_FUNC(){
  if(F_LAMPA_FEL == false){
    if(Firebase.getBool(firebaseData, "/FURDO/LAMP")){
      if(firebaseData.dataType() == "boolean"){
        if(F_LAMPA_FEL == false){
          F_LAMPA = firebaseData.boolData();
          digitalWrite(F_LAMPA_PIN, F_LAMPA);
        }
      }
    }
  }
}
    //FELTÖLTÉS
void F_LAMPA_FEL_FUNC(){
  if(Firebase.setBool(firebaseData, "/FURDO/LAMP", F_LAMPA));
  F_LAMPA_FEL = false;
}



//HŐMÉRSÉKLET
void HOM_FUNC(){
  if(HOM_CYCLE == 10){
    sensors.requestTemperatures();
    delay(250);
    H_HOM = sensors.getTempCByIndex(0);
    F_HOM = sensors.getTempCByIndex(1);
    Serial.println(H_HOM);
    Serial.println(F_HOM);
    if(H_HOM_H-0.1 > H_HOM || H_HOM_H+0.1 < H_HOM){
      Firebase.setDouble(firebaseData, "/HALO/TEMP", H_HOM);
      H_HOM_H = H_HOM;
    }
    if(F_HOM_H-0.1 > F_HOM || F_HOM_H+0.1 < F_HOM){
      Firebase.setDouble(firebaseData, "/FURDO/TEMP", F_HOM);
      F_HOM_H = F_HOM;
    }
    HOM_CYCLE = 0;
  }
  else{
    HOM_CYCLE++;
  }
}



void setup() {
  //HALO PINEK ÉS INTERUPTOK
  //ABLAK:
  pinMode(H_ABLAK_PIN, INPUT);
  //LÁMPA:
  pinMode(H_LAMPA_PIN, OUTPUT);
  pinMode(H_LAMPAKAPCS_PIN, INPUT);
  attachInterrupt(H_LAMPAKAPCS_PIN, H_LAMPAKAPCS_FUNC, RISING);

  //FURDO PINEK ÉS INTERUPTOK
  //ABLAK:
  pinMode(F_ABLAK_PIN, INPUT);
  //LÁMPA:
  pinMode(F_LAMPA_PIN, OUTPUT);
  pinMode(F_LAMPAKAPCS_PIN, INPUT);
  attachInterrupt(F_LAMPAKAPCS_PIN, F_LAMPAKAPCS_FUNC, RISING);



  
  sensors.begin();
  
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  Firebase.setwriteSizeLimit(firebaseData, "tiny");


  H_ABLAK_H != digitalRead(H_ABLAK_PIN);
}

void loop() {
  if(H_LAMPA_FEL == true) H_LAMPA_FEL_FUNC();
  H_LAMPA_FUNC();
  H_ABLAK_FUNC();
  if(F_LAMPA_FEL == true) F_LAMPA_FEL_FUNC();
  F_LAMPA_FUNC();
  F_ABLAK_FUNC();
  HOM_FUNC();
}
