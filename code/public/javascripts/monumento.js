window.onload = async function () {
    let monumento_id = sessionStorage.getItem("monumento_id");

    let monumento = await $.ajax({
        url: "/api/monumentos/" + monumento_id,
        method: "get",
        dataType: "json"
    });
    console.log(monumento);
    /*document.getElementById("cover").src = "/images/cover" + monumento.monumento_id + ".jpg";  


    if (monumento.Cover != null) {
        document.getElementById("cover").src = monumento.Cover;
    }*/


    document.getElementById("nome").innerHTML = monumento.nomemonumento;
    document.getElementById("guia").innerHTML = monumento.nomeguia;

    let html = "";
    for (let reserva of monumento.reservas) {
        html += "<p>" + reserva.nomereserva + "</p>";
    }
    document.getElementById("reservas").innerHTML = html;
}