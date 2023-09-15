import { Component, OnInit, Input } from '@angular/core';
import { Observable, interval } from 'rxjs';


// Importieren Sie hier Ihr Datenautobahn-Interface
import { datensuche } from '../models';

@Component({
  selector: 'app-liste-suche',
  templateUrl: './liste-suche.component.html',
  styleUrls: ['./liste-suche.component.scss']
})
export class ListeSucheComponent {
  @Input() daten: datensuche = {
    nameaus: '',
    laenge: 0,
    Baustellen: 0,
    Sperrungen: 0,
    Warnungen: 0,
    Rastplaetze: 0,
    Webcam: 0,
    Score: 0
  };

  constructor() { }

  ngOnInit(): void {
    // Rufen Sie alle 30 Sekunden eine Funktion auf, um die Liste zu sortieren
    const sortInterval = interval(30000); // In Millisekunden (30 Sekunden)

    sortInterval.subscribe(() => {
      this.sortListByScore();
    });
  }

  sortListByScore(): void {
    // this.daten.sort((a, b) => b.Score - a.Score);
  }
}