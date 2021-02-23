window.onload = function () {
    showReserva();
}

async function loadReservas() {
    try {
        let reservas = await $.ajax({
            url: "/api/reservas/reservasUtilizador/" + sessionStorage.getItem("userID"),
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

    }
    async function addReserva() {
        let monumento_id = sessionStorage.getItem("monumento_id");
        let user_id = sessionStorage.getItem("user_id");
        let reserva = {
            nome: document.getElementById("data").value,
            monumento_id: monumento_id,
            user_id: user_id
        }
        try {
            let novareserva = await $.ajax({
                url: "/api/reservas/novareserva",
                method: "post",
                dataType: "json",
                data: JSON.stringify(reserva),
                contentType: "application/json"
            });
            if (novareserva == null) {
                alert("Unexpected error, please try again!", "");
            }
            alert("Reserva efetuada")
        } catch (err) {
            console.log(err);
            // mensagem para o utilizador
        }
    }
}