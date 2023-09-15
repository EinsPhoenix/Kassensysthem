import { Component } from '@angular/core';
import { datenautobahn, datensuche } from './models';
import { AppModule } from './app.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})





export class AppComponent {
  title = 'Autorenner';
  items: any[] = [];

  public dto: datenautobahn[] = [];
  public dtos: datensuche[] = [];
  searchQuery: string = '';


  constructor(private http: HttpClient) {
    this.getData();

  }
  getlength = 0;
  scorevalue: number = 50;
  dtoConst: any = null;
  gesucht: boolean = false;

  getData() {
    this.http.get<any>('https://verkehr.autobahn.de/o/autobahn').subscribe(async (data) => {
      console.log(data.roads[0]);

      const promises = data.roads.map(async (element: any) => {
        const anzahlbaustellen = await this.getRoadworkUrl(element);
        const anzahlrastplätze = await this.getRastplätzUrl(element);
        const anzahlSperrungen = await this.getSperrungenUrl(element);
        const anzahlWebcam = await this.getWebcamsUrl(element);
        const anzahlWarning = await this.getwarningUrl(element);
        const length = await this.getLengthById(element);
        const score = await this.getScore(anzahlWebcam, length, anzahlSperrungen, anzahlrastplätze, anzahlbaustellen);

        let temp: datenautobahn = {
          names: data.roads,
          nameaus: element,
          Baustellen: anzahlbaustellen,
          laenge: length,
          Rastplaetze: anzahlrastplätze,
          Sperrungen: anzahlSperrungen,
          Warnungen: anzahlWarning,
          Webcam: anzahlWebcam,
          Score: score
        };

        this.saveDataToLocalStorage(element, anzahlbaustellen, length, anzahlrastplätze, anzahlSperrungen, anzahlWebcam, score);

        if (this.dto.length === 0 || score <= this.dto[0].Score) {

          // If the array is empty or the current score is smaller or equal to the smallest score in the array,
          // insert the element at the beginning of the array.
          this.dto.unshift(temp);
        } else if (score >= this.dto[this.dto.length - 1].Score) {
          // If the current score is larger or equal to the largest score in the array,
          // insert the element at the end of the array.
          this.dto.push(temp);
        } else {
          // Otherwise, find the appropriate position in the middle of the array.
          for (let i = 0; i < this.dto.length - 1; i++) {
            if (score >= this.dto[i].Score && score <= this.dto[i + 1].Score) {
              this.dto.splice(i + 1, 0, temp);
              break;
            }
          }
        }
      });
    });
  }





  private saveDataToLocalStorage(nameauto: string, Baustellen: number, length: number, Rastplatz: number, Sperrung: number, Web: number, Score: number): void {

    const daten = {
      "Bau": Baustellen,
      "länge": length,
      "Rast": Rastplatz,
      "Sper": Sperrung,
      "Webcam": Web,
      "Score": Score

    }


    localStorage.setItem(nameauto, JSON.stringify(daten));
  }



  performSearch() {
    if (this.searchQuery.trim() === '') {
      // Wenn das Suchfeld leer ist, alle Elemente anzeigen
      location.reload();
      console.log('Suche nicht ausgelöst:', this.searchQuery);
      return this.dto; // Rückgabe des ursprünglichen Arrays
    } else {
      // Erstellen Sie eine neue Liste mit den gefilterten Ergebnissen

      console.log('Suche ausgelöst:', this.searchQuery);
      this.getDataSearch(this.searchQuery);
      this.gesucht = true
      return this.searchQuery;

    }
  }

  async getDataSearch(id: string) {
    this.dtos = [];





    const anzahlbaustellen = await this.getRoadworkUrl(id);
    const anzahlrastplätze = await this.getRastplätzUrl(id);
    const anzahlSperrungen = await this.getSperrungenUrl(id);
    const anzahlWebcam = await this.getWebcamsUrl(id);
    const anzahlWarning = await this.getwarningUrl(id);
    const length = await this.getLengthById(id);
    const score = await this.getScore(anzahlWebcam, length, anzahlSperrungen, anzahlrastplätze, anzahlbaustellen);

    let datensuchen: datensuche = {

      nameaus: id,
      Baustellen: anzahlbaustellen,
      laenge: length,
      Rastplaetze: anzahlrastplätze,
      Sperrungen: anzahlSperrungen,
      Warnungen: anzahlWarning,
      Webcam: anzahlWebcam,
      Score: score
    };

    this.dtos.push(datensuchen);

  }



  ngOnInit() {
    this.items = Object.entries(localStorage)
      .filter(([key, value]) => key.startsWith('A') && /\d/.test(value))
      .map(([key, value]) => ({
        name: key,
        score: parseFloat(value),
      }));

  }

  public async getRoadworkUrl(id: string): Promise<number> {
    let url = `https://verkehr.autobahn.de/o/autobahn/${id}/services/roadworks`;
    const data = await this.http.get<any>(url).toPromise();
    const roadworksDictionary = data.roadworks;
    const anzahlbaustellen: number = roadworksDictionary.length;
    console.log(`Anzahl der Einträge im Dictionary: ${anzahlbaustellen}`);
    return anzahlbaustellen;
  }

  public async getRastplätzUrl(id: string): Promise<number> {
    let url = `https://verkehr.autobahn.de/o/autobahn/${id}/services/parking_lorry`;
    const data = await this.http.get<any>(url).toPromise();
    const Dictionary = data.parking_lorry;
    const anzahlrastplätze: number = Dictionary.length;
    console.log(`Anzahl der Einträge im Dictionary: ${anzahlrastplätze}`);

    return anzahlrastplätze;
  }

  public async getSperrungenUrl(id: string): Promise<number> {
    let url = `https://verkehr.autobahn.de/o/autobahn/${id}/services/closure`;
    const data = await this.http.get<any>(url).toPromise();
    const Dictionary = data.closure;
    const anzahlSperrungen: number = Dictionary.length;
    console.log(`Anzahl der Einträge im Dictionary: ${anzahlSperrungen}`);

    return anzahlSperrungen;
  }

  public async getWebcamsUrl(id: string): Promise<number> {
    let url = `https://verkehr.autobahn.de/o/autobahn/${id}/services/webcam`;
    const data = await this.http.get<any>(url).toPromise();
    const Dictionary = data.webcam;
    const anzahlWebcam: number = Dictionary.length;
    console.log(`Anzahl der Einträge im Dictionary: ${anzahlWebcam}`);

    return anzahlWebcam;
  }

  public async getwarningUrl(id: string): Promise<number> {
    let url = `https://verkehr.autobahn.de/o/autobahn/${id}/services/warning`;
    const data = await this.http.get<any>(url).toPromise();
    const Dictionary = data.warning;
    const anzahlWarning: number = Dictionary.length;
    console.log(`Anzahl der Einträge als Warnung: ${anzahlWarning}`);

    return anzahlWarning;
  }
  public getLengthById(id: string): Promise<number> {
    const url = '/assets/dictionarylength.json';

    return new Promise<number>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (data) => {
          const length = data[id]; // Den Wert mit der angegebenen ID aus dem JSON-Dictionary abrufen
          console.log("Länge", length);
          resolve(length); // Das Ergebnis über das Promise zurückgeben
        },
        (error) => {
          reject(error); // Im Falle eines Fehlers das Promise ablehnen
        }
      );
    });
  }


  public async getScore(anzahlWebcam: number, length: number, sperrungen: number, Rastplätze: number, roadWork: number) {

    var Score = 1;
    Score = (Rastplätze * 0.1) + (roadWork * 5) + (sperrungen * 8) + (anzahlWebcam * 2);
    var ScoreFinalPerKm = Score / length * 100;

    return ScoreFinalPerKm;





  }








}

