#include <iostream>
#include <sstream>
#include <vector>
#include <fstream>
#include <string>

#include <stdio.h>
#include <string.h>
using namespace std;

struct Butor
{
public:
    int suly;
    string jellemzoAnyag;
    int legnagyobbMagassag;
};

struct Asztal : Butor
{
public:
    string asztallapAlak;
    bool fiokos;
};

struct Szekreny : Butor
{
public:
    bool uveges;
    bool kulcsalZarhato;
};

int main()
{
    string line;
    int i = 0;
    vector<string> v;
    ifstream fin;
    string asd;
    fin.open("adatok.txt");
    if (fin.is_open()){
        while (getline(fin, line)){
            stringstream ss(line);
            while (getline(ss, line, ';')){
                v.push_back(line);
            }
        }

        while (true){
            if (i == v.size()){
                break;
            }
            cout << v[i] << "\n";
            i++;
        }
    }

    //ha v[i][1]-ik eleme "szekreny" && v[i][2] == max(a legnagyobb az osszes kozul(erre meg kell egy fuggveny)) akkor irja ki az adatait "Üveges szekrény összes adatának kiiratását"
    for (size_t i = 0; i < sizeof(v); i++){
        char *token = strtok(v[i], ",");

        while (token != NULL)
        {
            cout << "%s\n" << token;
            token = strtok(NULL, ",");
        }
    }

    vector<Butor> butorVector;

    Asztal asztal;
    Szekreny szekreny;

    //ezeknek a v[i][j]-ik elemevel kell egyenlonek lennie majd(suly, anyag, magassag, ha asztal(alakja, fiokos-e), ha szekreny(uveges-e, kulcsal zarhato-e))
    szekreny.suly = 49;
    asztal.fiokos = true;
    szekreny.uveges = false;

    cout << boolalpha;
    cout << "\n";
    cout << "Legnehezebb uveges szekreny adatai:\n";
    cout << "  Suly: " << szekreny.suly << "\n";
    cout << "  Anyag:\n";
    cout << "  Magassag:\n";
    cout << "  Asztallap alakaja:\n";
    cout << "  Fiokos: " << asztal.fiokos << "\n"; //igen v nem
    cout << "  Uveges:\n";                         //igen v nem
    cout << "  Kulcsal zarhato:\n";                //igen v nem
    cout << "\n";
    cout << "Kulcsal zarhato femszekrenyek melyek uvegesek:\n";
    cout << "  Megnevezes: \n";
    //cout << "\n";

    return 0;
}