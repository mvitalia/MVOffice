var db // variabile globale che rappresenta l' oggetto database che creo



$(document).ready(function () {

   
    creazioneDatabase();
   

});

function creazioneDatabase() {

    db = window.openDatabase("Mvoffice", "1.0", "Database mvoffice", 200000);
    db.transaction(creoDB, erroreCreoDB, successoDB);
}

function creoDB(tx) {
   
    tx.executeSql("CREATE TABLE IF NOT EXISTS login_utente (id INTEGER PRIMARY KEY AUTOINCREMENT,codice, username, password,rimani_loggato)");
    selezioneStatoUtente();
}

function erroreCreoDB(error) {
    // Scommentare per vedere se il DB non viene creato e quale messaggio restituisce
    // alert("Errore database: " + error.message);
}

function successoDB() {
    // Scommentare per vedere se il DB viene creato
    // alert("OK db creato");
}

function selezioneStatoUtente() {
   
    db.transaction(selezionoUtente);
}

function selezionoUtente(tx) {
   
    // Selezione le categorie aggiornate nella tabella categoria_gallery del telefono
    tx.executeSql("SELECT * FROM login_utente", [],
        function (tx, dati) {
            var len = dati.rows.length;
            var rimani_loggato_mvoffice = "";
            var cod_loggato = "";
            var username_loggato = "";
            var password_loggato = "";
            if (len != 0) {
                for (var i = 0; i < len; i++) {
                    //  alert("ciclo");
                    rimani_loggato_mvoffice = "" + dati.rows.item(i).rimani_loggato;
                    cod_loggato = "" + dati.rows.item(i).codice;
                    username_loggato = "" + dati.rows.item(i).username;
                    password_loggato = "" + dati.rows.item(i).password;
                }



            }
            if (rimani_loggato_mvoffice == "si") {
            
               
                $("#codice_lbl").addClass("active");
                $("#usernameLogin_lbl").addClass("active");
                $("#passwordLogin_lbl").addClass("active");
                document.getElementById("codice").value = cod_loggato;
                document.getElementById("usernameLogin").value = username_loggato;
                document.getElementById("passwordLogin").value = password_loggato;
            } else {

            }
        },
        function () {
           // alert("Errore" + e.message);
        })

    // Qua faccio due selezioni se è ceccato social o se non è ceccato social


}