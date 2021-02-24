/*window.onload = function () {
    showReserva();
}

async function loadReservas() {
    try {
        let reservas = await $.ajax({
            url: "/api/reservas/reservasUtilizador/" + sessionStorage.getItem("user_id"),
            method: "get",
            dataType: "json",
        });
        return reservas;
    } catch (err) {
        console.log(err);
    }
}
async function showReserva() {
    let reservas = await loadReservas();
    let elemAtuais = document.getElementById("listaReservas-atuais");
    let htmlAtuais = "";
    for (let reserva of reservas) {
        htmlAtuais += "<p>" + reserva.nome + "</p>";
        elemAtuais.innerHTML = htmlAtuais;

    }*/
async function addReserva() {
    try {
        let reserva = {
            nomereserva: document.getElementById("reserva").value,
            user_id: parseInt(document.getElementById("utilizador").value),
            monumento_id: parseInt(document.getElementById("monumento").value)
        }
        alert(JSON.stringify(reserva));
        let result = await $.ajax({
            url: "/api/reservas",
            method: "post",
            dataType: "json",
            data: JSON.stringify(reserva),
            contentType: "application/json"
        });
        alert(JSON.stringify(result));
    } catch (err) {
        console.log(err);
    }
}