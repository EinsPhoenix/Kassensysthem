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
            if (inputText) {
                const listItem = document.createElement("li");
                listItem.textContent = inputText;
                list.appendChild(listItem);
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
        const buttonElement = event.target;
        const buttonuId = localStorage.getItem(buttonElement.id + "u");
        console.log(buttonuId);

        namei = JSON.parse(localStorage.getItem(buttonuId)).name;

        preisi = JSON.parse(localStorage.getItem(buttonuId)).preis;
        steuerni = JSON.parse(localStorage.getItem(buttonuId)).steuern;
        console.log(namei, preisi, steuerni);

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

    for (let i = 1; i <= 16; i++) {

        const button = document.getElementById(`s${i}`);
        button.addEventListener('click', shortcutpress);
    }
});