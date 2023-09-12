const resultArea = document.getElementById("number-display") as HTMLOutputElement;

function logInput(event) {
    const button = event.target;
    const buttonText = button.textContent;
    const list = document.getElementById("Listenelement") as HTMLUListElement;
    console.log("Geklickter Button: " + buttonText);



    if (buttonText === "Del") {

        const currentText = resultArea.textContent;
        if (currentText !== null && currentText !== undefined) {
            resultArea.textContent = currentText.slice(0, -1);
        }

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
        if (!isNaN(parseFloat(buttonText)) || buttonText === ".") {
            resultArea.textContent += buttonText;
        }
    }


}

//Eventlistener alle numpadbuttons
const buttons = document.querySelectorAll("#numeric-keypad button");
buttons.forEach(button => {
    button.addEventListener("click", logInput);
});