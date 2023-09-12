// Warten, bis das Dokument vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("Submitbutton");

    submitButton.addEventListener("click", function () {
        // Benutzereingaben abrufen
        const uuid = document.getElementById("uuidInput").value;
        const name = document.getElementById("nameInput").value;
        const preis = parseFloat(document.getElementById("preisInput").value);
        const steuern = parseFloat(document.getElementById("steuernInput").value);

        // Überprüfen, ob alle Textfelder ausgefüllt sind und die Werte gültig sind
        if (uuid && name && !isNaN(preis) && !isNaN(steuern)) {
            // Überprüfen, ob die UUID bereits im Local Storage vorhanden ist
            const storedUUID = localStorage.getItem(uuid);
            if (storedUUID) {
                // UUID ist bereits im Local Storage, Textfelder leeren
                alert("UUID existiert bereits im Local Storage. UUID wird geleert.");
                document.getElementById("uuidInput").value = "";

            } else {
                // UUID ist nicht im Local Storage, speichern Sie die Daten
                localStorage.setItem(uuid, JSON.stringify({ name, preis, steuern }));
                alert("Daten wurden erfolgreich gespeichert.");
            }
        } else {
            // Nicht alle Felder wurden ausgefüllt oder die Werte sind ungültig
            alert("Bitte füllen Sie alle Felder korrekt aus.");
        }
    });
});
