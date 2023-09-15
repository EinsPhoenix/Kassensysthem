
import { Injectable } from '@angular/core';
import { datenautobahn } from './models';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    // Funktion zum Hinzufügen oder Aktualisieren von Daten
    speichernOderAktualisierenDaten(neueDaten: datenautobahn): void {
        // Daten aus dem LocalStorage abrufen (falls vorhanden)
        const bestehendeDatenStr = localStorage.getItem('datenbank');

        console.log("Bestehene Daten", bestehendeDatenStr);
        const datenbank: datenautobahn[] = bestehendeDatenStr ? JSON.parse(bestehendeDatenStr) : [];

        // Überprüfen, ob ein Eintrag mit dem gleichen Namen bereits existiert
        const vorhandenerDatensatzIndex = datenbank.findIndex(eintrag => eintrag.names === neueDaten.names);

        if (vorhandenerDatensatzIndex !== -1) {
            // Wenn ein Datensatz mit dem gleichen Namen existiert, ersetzen Sie ihn
            datenbank[vorhandenerDatensatzIndex] = neueDaten;
        } else {
            // Andernfalls fügen Sie die neuen Daten hinzu
            datenbank.push(neueDaten);
        }

        // Aktualisierte Daten in den LocalStorage speichern
        localStorage.setItem('datenbank', JSON.stringify(datenbank));
    }
}