document.addEventListener("DOMContentLoaded", function () {

    function changeButtonName(buttonId) {
        console.log(buttonId);
        var newName = prompt("Neuer Name:");
        var newUUID = prompt("UUID:");
        var newprice = prompt("Price:")
        var steuer = prompt("Steuer ohne %:")
        if (newName !== null && newName.trim() !== "") {


            var button = document.getElementById(buttonId) as HTMLInputElement;
            console.log(newName);
            button.innerHTML = newName
            console.log(newName);


            //buttonid + neuer name speichern
            localStorage.setItem(buttonId, newName);
        }
    }

    //wiederherstellem
    function restoreButtonNames() {
        for (var i = 1; i <= 18; i++) {
            var buttonId = 's' + i;
            var savedName = localStorage.getItem(buttonId);
            if (savedName) {
                var button = document.getElementById(buttonId) as HTMLInputElement;
                button.textContent = savedName;
            }
        }
    }



    for (var i = 1; i <= 18; i++) {
        var buttonId = 's' + i;
        var button = document.getElementById(buttonId) as HTMLInputElement;
        button.addEventListener('click', function () {
            changeButtonName(buttonId);
        });
    }

    /*//onload
    restoreButtonNames(); */
});