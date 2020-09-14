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

//NAPPALI VÁLTOZÓK
//ABLAK:
const int N_ABLAK_PIN = 5;
bool N_ABLAK = false;
bool N_ABLAK_H = true;
//LÁMPA:
const int N_LAMPA_PIN = 2; //Lámpa (KIMENET)
const int N_LAMPAKAPCS_PIN = 0; //Kapcsoló (BEMENET)
volatile bool N_LAMPA_FEL = false; //TRUE ha gombal lett fel vagy le kapcsolva
volatile bool N_LAMPA = false; //Lámpa ki vagy be
volatile long N_LAMPA_TIMER = 0; //Prell
//HŐMÉRSÉKLET:
double N_HOM = 0;
double N_HOM_H = 100;



//ETKEZO VÁLTOZÓK
//ABLAK:
const int E_ABLAK_PIN = 13;
bool E_ABLAK = false;
bool E_ABLAK_H = true;
//LÁMPA:
const int E_LAMPA_PIN = 12; //Lámpa (KIMENET)
const int E_LAMPAKAPCS_PIN = 14; //Kapcsoló (BEMENET)
volatile bool E_LAMPA_FEL = false; //TRUE ha gombal lett fel vagy le kapcsolva
volatile bool E_LAMPA = false; //Lámpa ki vagy be
volatile long E_LAMPA_TIMER = 0; //Prell
//HŐMÉRSÉKLET:
double E_HOM = 0;
double E_HOM_H = 100;



//NAPPALI FUNCTIONOK ÉS INTERRUPTOK
//ABLAK:
void N_ABLAK_FUNC(){
  N_ABLAK = digitalRead(N_ABLAK_PIN);
  if(N_ABLAK != N_ABLAK_H){
    if(Firebase.setBool(firebaseData, "/NAPPALI/WINDOW", N_ABLAK));
    N_ABLAK_H = N_ABLAK;
  }
}
//LÁMPA:
    //INTERRUPT
void N_LAMPAKAPCS_FUNC(){
  if(N_LAMPA_TIMER < millis()-250 || N_LAMPA_TIMER > millis()){
    N_LAMPA = !N_LAMPA;
    digitalWrite(N_LAMPA_PIN, N_LAMPA);
    N_LAMPA_TIMER = millis();
    N_LAMPA_FEL = true;
  }
}
    //LEKÉRDEZÉS
void N_LAMPA_FUNC(){
  if(N_LAMPA_FEL == false){
    if(Firebase.getBool(firebaseData, "/NAPPALI/LAMP")){
      if(firebaseData.dataType() == "boolean"){
        if(N_LAMPA_FEL == false){
          N_LAMPA = firebaseData.boolData();
          digitalWrite(N_LAMPA_PIN, N_LAMPA);
        }
      }
    }
  }
}
    //FELTÖLTÉS
void N_LAMPA_FEL_FUNC(){
  if(Firebase.setBool(firebaseData, "/NAPPALI/LAMP", N_LAMPA));
  N_LAMPA_FEL = false;
}



//ETKEZO FUNCTIONOK ÉS INTERRUPTOK
//ABLAK:
void E_ABLAK_FUNC(){
  E_ABLAK = digitalRead(E_ABLAK_PIN);
  if(E_ABLAK != E_ABLAK_H){
    if(Firebase.setBool(firebaseData, "/ETKEZO/WINDOW", E_ABLAK));
    E_ABLAK_H = E_ABLAK;
  }
}
//LÁMPA:
    //INTERRUPT
void E_LAMPAKAPCS_FUNC(){
  if(E_LAMPA_TIMER < millis()-250 || E_LAMPA_TIMER > millis()){
    E_LAMPA = !E_LAMPA;
    digitalWrite(E_LAMPA_PIN, E_LAMPA);
    E_LAMPA_TIMER = millis();
    E_LAMPA_FEL = true;
  }
}
    //LEKÉRDEZÉS
void E_LAMPA_FUNC(){
  if(E_LAMPA_FEL == false){
    if(Firebase.getBool(firebaseData, "/ETKEZO/LAMP")){
      if(firebaseData.dataType() == "boolean"){
        if(E_LAMPA_FEL == false){
          E_LAMPA = firebaseData.boolData();
          digitalWrite(E_LAMPA_PIN, E_LAMPA);
        }
      }
    }
  }
}
    //FELTÖLTÉS
void E_LAMPA_FEL_FUNC(){
  if(Firebase.setBool(firebaseData, "/ETKEZO/LAMP", E_LAMPA));
  E_LAMPA_FEL = false;
}



//HŐMÉRSÉKLET
void HOM_FUNC(){
  if(HOM_CYCLE == 10){
    sensors.requestTemperatures();
    delay(250);
    N_HOM = sensors.getTempCByIndex(0);
    E_HOM = sensors.getTempCByIndex(1);
    Serial.println(N_HOM);
    Serial.println(E_HOM);
    if(N_HOM_H-0.1 > N_HOM || N_HOM_H+0.1 < N_HOM){
      Firebase.setDouble(firebaseData, "/NAPPALI/TEMP", N_HOM);
      N_HOM_H = N_HOM;
    }
    if(E_HOM_H-0.1 > E_HOM || E_HOM_H+0.1 < E_HOM){
      Firebase.setDouble(firebaseData, "/ETKEZO/TEMP", E_HOM);
      E_HOM_H = E_HOM;
    }
    HOM_CYCLE = 0;
  }
  else{
    HOM_CYCLE++;
  }
}



void setup() {
  //NAPPALI PINEK ÉS INTERUPTOK
  //ABLAK:
  pinMode(N_ABLAK_PIN, INPUT);
  //LÁMPA:
  pinMode(N_LAMPA_PIN, OUTPUT);
  pinMode(N_LAMPAKAPCS_PIN, INPUT);
  attachInterrupt(N_LAMPAKAPCS_PIN, N_LAMPAKAPCS_FUNC, RISING);

  //ETKEZO PINEK ÉS INTERUPTOK
  //ABLAK:
  pinMode(E_ABLAK_PIN, INPUT);
  //LÁMPA:
  pinMode(E_LAMPA_PIN, OUTPUT);
  pinMode(E_LAMPAKAPCS_PIN, INPUT);
  attachInterrupt(E_LAMPAKAPCS_PIN, E_LAMPAKAPCS_FUNC, RISING);



  
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


  N_ABLAK_H != digitalRead(N_ABLAK_PIN);
}

void loop() {
  if(N_LAMPA_FEL == true) N_LAMPA_FEL_FUNC();
  N_LAMPA_FUNC();
  N_ABLAK_FUNC();
  if(E_LAMPA_FEL == true) E_LAMPA_FEL_FUNC();
  E_LAMPA_FUNC();
  E_ABLAK_FUNC();
  HOM_FUNC();
}
