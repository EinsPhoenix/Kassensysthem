
const uuid = {
    900: 'Brötchen'
}



const preis = {
    900: 49

}
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("Submitbutton") as HTMLButtonElement;

    submitButton.addEventListener("click", function () {

        const uuidElement = document.getElementById("uuidInput") as HTMLInputElement;
        const nameElement = document.getElementById("nameInput") as HTMLInputElement;
        const preisElement = document.getElementById("preisInput") as HTMLInputElement;
        const steuernElement = document.getElementById("steuernInput") as HTMLInputElement;
        // Benutzereingaben abrufen
        const uuid = uuidElement.value;
        const name = nameElement.value;
        const preis = parseFloat(preisElement.value);
        const steuern = parseFloat(steuernElement.value);

        // Überprüfen, ob alle Textfelder ausgefüllt sind und die Werte gültig sind
        if (uuid && name && !isNaN(preis) && !isNaN(steuern)) {
            // Überprüfen, ob die UUID bereits im Local Storage vorhanden ist
            const storedUUID = localStorage.getItem(uuid);
            if (storedUUID) {
                // UUID ist bereits im Local Storage, Textfelder leeren
                alert("UUID existiert bereits im Local Storage. Textfelder werden geleert.");
                uuidElement.value = "";
                nameElement.value = "";
                preisElement.value = "";
                steuernElement.value = "";
            } else {
                // UUID ist nicht im Local Storage, speichern Sie die Daten
                localStorage.setItem(uuid, JSON.stringify({ name, preis, steuern }));
                uuidElement.value = "";
                nameElement.value = "";
                preisElement.value = "";
                steuernElement.value = "";
                alert("Daten wurden erfolgreich gespeichert.");
            }
        } else {
            // Nicht alle Felder wurden ausgefüllt oder die Werte sind ungültig
            alert("Bitte füllen Sie alle Felder korrekt aus.");
        }
    });
});