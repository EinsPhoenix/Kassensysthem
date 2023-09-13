document.addEventListener("DOMContentLoaded", function () {
    const resultArea = document.getElementById("number-display");

    function logInput(event) {
        const button = event.target;
        const buttonText = button.textContent;
        const list = document.getElementById("Listenelement");
        console.log("Geklickter Button: " + buttonText);



        if (buttonText === "Del") {

            const currentText = resultArea.textContent;
            resultArea.textContent = currentText.slice(0, -1);
        } else if (buttonText === "Eingabe") {


            const inputText = resultArea.textContent;
            console.log(JSON.parse(inputText));
            const inputTextid = localStorage.getItem(JSON.parse(inputText));
            console.log(inputTextid);

            if (inputTextid) {
                const namei = JSON.parse(localStorage.getItem(JSON.parse(inputText))).name;
                let preisi = JSON.parse(localStorage.getItem(JSON.parse(inputText))).preis;
                let steuerni = JSON.parse(localStorage.getItem(JSON.parse(inputText))).steuern;

                preisi = Number(preisi);
                steuerni = Number(steuerni);


                preisi = Number(preisi) / 100;
                preisi = preisi.toFixed(2);


                if (inputText) {
                    const listItem = document.createElement("li");

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Löschen";
                    deleteButton.style.visibility = "hidden"; // Unsichtbar zu Beginn
                    deleteButton.addEventListener("click", function () {
                        // Eventlistener zum Löschen des Listenelements
                        list.removeChild(listItem);
                        addiereMittlereZahlen();
                        const allDeleteButtons = document.querySelectorAll("#Listeu li button");
                        allDeleteButtons.forEach(button => {
                            button.style.visibility = "hidden";
                        });
                    });

                    listItem.textContent = `${namei}, ${preisi}€`;
                    listItem.appendChild(deleteButton);
                    list.appendChild(listItem);
                }


            }
            else {
                alert("Keine UUID vorhanden")
            }


            resultArea.textContent = "";
        }
        else if (buttonText === "C") {

            resultArea.textContent = "";
        }

        else {
            //Ist das eine Nummer oder nicht?
            if (!isNaN(parseFloat(buttonText)) && isFinite(buttonText)) {
                resultArea.textContent += buttonText;
            }
        }


    }

    //Shortcut functionen

    function shortcutpress(event) {
        const list = document.getElementById("Listenelement");
        const buttonElement = event.target;
        const buttonuId = localStorage.getItem(buttonElement.id + "u");
        console.log(buttonuId);

        const namei = JSON.parse(localStorage.getItem(buttonuId)).name;
        let preisi = JSON.parse(localStorage.getItem(buttonuId)).preis;
        let steuerni = JSON.parse(localStorage.getItem(buttonuId)).steuern;

        preisi = Number(preisi);

        steuerni = Number(steuerni);
        console.log(namei, preisi, steuerni);


        preisi = Number(preisi) / 100;
        preisi = preisi.toFixed(2);



        const listItem = document.createElement("li");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.style.visibility = "hidden"; // Unsichtbar zu Beginn
        deleteButton.addEventListener("click", function () {
            // Eventlistener zum Löschen des Listenelements
            list.removeChild(listItem);
            addiereMittlereZahlen();
            const allDeleteButtons = document.querySelectorAll("#Listeu li button");
            allDeleteButtons.forEach(button => {
                button.style.visibility = "hidden";
            });
        });

        listItem.textContent = `${namei}, ${preisi}€`;
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    }

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

    restoreButtonNames();



    function addiereMittlereZahlen() {
        var listeElemente = document.querySelectorAll('#Listeu li');
        var summe = 0;

        for (var i = 0; i < listeElemente.length; i++) {
            var text = listeElemente[i].textContent;
            var zahlen = text.match(/[-+]?\d+(\.\d+)?/g); // Extrahiere alle Zahlen (ganze und Dezimalzahlen)

            if (zahlen && zahlen.length > 0) {
                for (var j = 0; j < zahlen.length; j++) {
                    var zahl = parseFloat(zahlen[j]);
                    console.log(zahl);
                    summe += zahl;

                }
            }
        }

        summe = summe / 2;
        summe = summe.toFixed(2);
        anzeigensumme = document.getElementById("Summenfeld");
        anzeigensumme.innerHTML = summe + "€";
        console.log('Summe der Zahlen: ' + summe);
        alert('Summe der Zahlen: ' + summe);
    }

    function handleMutation(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Ein neues Listenelement wurde hinzugefügt, rufen Sie Ihre Funktion auf
                addiereMittlereZahlen();
            }
        }
    }

    function entferneLetztesElement() {
        var listeElemente = document.querySelectorAll('#Listeu li');
        var letztesElement = listeElemente[listeElemente.length - 1];

        if (listeElemente.length > 1) {
            var letztesElement = listeElemente[listeElemente.length - 1];
            letztesElement.remove();
            addiereMittlereZahlen(); // Aktualisieren Sie die Summe nach dem Entfernen
        }
    }
    document.getElementById('entfernenButton').addEventListener('click', entferneLetztesElement);




    function preisemanuel(targetbutton) {
        const list = document.getElementById("Listenelement");


        const inputText = resultArea.textContent; // Trimmen Sie den Text, um führende und abschließende Leerzeichen zu entfernen.
        const testennumber = Number(inputText)
        if (targetbutton === "leben" && testennumber !== 0) {
            var preis = Number(inputText) / 100;
            preis = preis.toFixed(2);

            const listItem = document.createElement("li");

            listItem.textContent = `Lebensmittel, ${preis}€`;
            list.appendChild(listItem);

        } else if (targetbutton === "nonfood" && testennumber !== 0) {
            var preis = Number(inputText) / 100;

            preis = preis.toFixed(2);

            const listItem = document.createElement("li");

            listItem.textContent = `Nonfood, ${preis}€`;
            list.appendChild(listItem);
        }
        else if (targetbutton === "abzug" && testennumber !== 0) {
            var preis = Number(inputText) / 100;

            preis = 0 - preis.toFixed(2);

            const listItem = document.createElement("li");

            listItem.textContent = `Abzug, ${preis.toFixed(2)}€`;
            list.appendChild(listItem);


        } else {
            alert("Fehler"); // "Fehler" in Anführungszeichen setzen.
        }

        resultArea.textContent = "";
    }

    document.getElementById("abzug").addEventListener("click", function () {
        preisemanuel("abzug");
    });
    // Event-Listener hinzufügen (die Funktion wird erst beim Klicken aufgerufen, nicht sofort).
    document.getElementById("leben").addEventListener("click", function () {
        preisemanuel("leben");
    });

    document.getElementById("nonfood").addEventListener("click", function () {
        preisemanuel("nonfood");
    });



    document.getElementById("showButtons").addEventListener("click", function () {
        var listeElemente = document.querySelectorAll('#Listeu li');


        if (listeElemente.length > 2) {
            const allDeleteButtons = document.querySelectorAll("#Listeu li button");
            allDeleteButtons.forEach(button => {
                button.style.visibility = "visible";
            });
        }

        else {
            alert("nicht erlaubt");


        }
    });






    // Hier erstellen wir einen Mutation Observer
    var observer = new MutationObserver(handleMutation);
    var options = { childList: true, subtree: true };
    observer.observe(document.getElementById('Listeu'), options);




    // Eventlistener für den Button hinzufügen
    document.getElementById("Summe").addEventListener("click", function () {
        addiereMittlereZahlen();
    });


    //Eventlistener alle numpadbuttons
    const buttons = document.querySelectorAll("#numeric-keypad button");
    buttons.forEach(button => {
        button.addEventListener("click", logInput);
    });

    document.getElementById("einstellungen").addEventListener("click", function () {
        // Umleitung zur anderen Seite
        window.location.href = "einstellungen.html";
    });



    for (let i = 1; i <= 16; i++) {

        const button = document.getElementById(`s${i}`);
        button.addEventListener('click', shortcutpress);
    }
});