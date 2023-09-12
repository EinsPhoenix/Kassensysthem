document.addEventListener("DOMContentLoaded", function () {

    function changeButtonName(event) {
        const buttonElement = event.target;
        const buttonId = buttonElement.id;
        console.log(buttonId);
        var newUUID = prompt("UUID");
        // Prüfen, ob die eingegebene UUID im Local Storage vorhanden ist
        var storedUUIDs = JSON.parse(localStorage.getItem(newUUID));
        console.log(storedUUIDs);

        if (storedUUIDs !== 'null' || storedUUIDs !== 'undefined') {
            newName = JSON.parse(localStorage.getItem(newUUID)).name;


            var button = document.getElementById(buttonId);
            button.innerHTML = newName;

            // Die UUID ist im Local Storage vorhanden
            localStorage.setItem(buttonId + "u", newUUID);
            localStorage.setItem(buttonId, newName);
        }
        else {
            // Die UUID ist nicht im Local Storage vorhanden
            alert("UUID nicht gefunden! Bitte geben Sie eine gültige UUID ein.");
        }





    }
    //Numpad

    const resultArea = document.getElementById("number-display");

    function logInput(event) {
        const button = event.target;
        const buttonText = button.textContent;
        const list = document.getElementById("Listenelement");
        console.log("Geklickter Button: " + buttonText);



        if (buttonText === "Del") {

            const currentText = resultArea.value;
            resultArea.value = currentText.slice(0, -1);
        } else if (buttonText === "Eingabe") {
            Suchenl();


        } else {
            //Ist das eine Nummer oder nicht?
            if (!isNaN(parseFloat(buttonText)) && isFinite(buttonText)) {
                resultArea.textContent += buttonText;
            }
        }


    }


    //wiederherstellem
    function restoreButtonNames() {
        for (var i = 1; i <= 16; i++) {
            var buttonId = 's' + i;
            var savedName = localStorage.getItem(buttonId);
            if (savedName) {
                var button = document.getElementById(buttonId);
                button.innerHTML = savedName;
            }
        }
    }

    //Eventlistener alle numpadbuttons
    const buttons = document.querySelectorAll("#numeric-keypad button");
    buttons.forEach(button => {
        button.addEventListener("click", logInput);
    });

    for (let i = 1; i <= 16; i++) {

        const button = document.getElementById(`s${i}`);
        button.addEventListener('click', changeButtonName);
    }

    //onload
    restoreButtonNames();


    const openPopupButton = document.getElementById('neuanlegen');
    const popup = document.getElementById('popup');

    // Referenz zum Schließen-Button holen
    const closePopupButton = document.getElementById('closePopupButton');

    // Funktion zum Öffnen des Popups
    openPopupButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Funktion zum Schließen des Popups
    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });



    // Suchen im Local Storage
    function sucheImLocalStorage(suchbegriff) {
        let ergebnisse = [];

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let wert = localStorage.getItem(key);

            // Überprüfen, ob der Suchbegriff im Wert enthalten ist
            if (wert.includes(suchbegriff) || key.includes(suchbegriff)) {
                ergebnisse.push({ key, wert });
            }


        }

        return ergebnisse;
    }

    function Suchenl() {
        console.log(1);
        const suchbegriff = document.getElementById("suchbegriff").value;
        console.log(suchbegriff);
        const ergebnisListe = document.getElementById("ergebnisListe");

        // Suchen im Local Storage
        const ergebnisse = sucheImLocalStorage(suchbegriff);

        // Liste
        ergebnisListe.innerHTML = "";
        ergebnisse.forEach(function (ergebnis) {
            const listItem = document.createElement("li");
            listItem.textContent = `${ergebnis.key}: ${ergebnis.wert}`;
            // Button erstellung
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Löschen";
            deleteButton.addEventListener("click", function () {

                // Schlüssel aus dem Local Storage gelöscht
                localStorage.removeItem(ergebnis.key);
                ergebnisListe.removeChild(listItem);
            });


            listItem.appendChild(deleteButton);
            ergebnisListe.appendChild(listItem);


        });
    }











});