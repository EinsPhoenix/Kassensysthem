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

                if (Number(preisi) <= 100) {
                    preisi = Number(preisi) / 100;
                }

                if (inputText) {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${namei}, ${preisi}€, ${steuerni}%`;
                    list.appendChild(listItem);
                }


            }
            else {
                alert("Keine UUID vorhanden")
            }


            resultArea.textContent = "";
        } else {
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

        if (Number(preisi) <= 100) {
            preisi = Number(preisi) / 100;
        }


        const listItem = document.createElement("li");
        listItem.textContent = `${namei}, €${preisi}, ${steuerni}%`;
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

    //Eventlistener alle numpadbuttons
    const buttons = document.querySelectorAll("#numeric-keypad button");
    buttons.forEach(button => {
        button.addEventListener("click", logInput);
    });

    document.getElementById("einstellungen").addEventListener("click", function () {
        // Umleitung zur anderen Seite
        window.location.href = "einstellungen.html";
    });

    document.getElementById("Summe").addEventListener("click", function () {
        const uls = document.querySelectorAll('ul');

        let totalPrice = 0;

        for (const ul of uls) {
            const lis = ul.querySelectorAll('li');

            for (const li of lis) {
                const price = Number(li.textContent.split('€')[0]);

                totalPrice += price;
            }
        }

        alert(totalPrice);
    });

    for (let i = 1; i <= 16; i++) {

        const button = document.getElementById(`s${i}`);
        button.addEventListener('click', shortcutpress);
    }
});