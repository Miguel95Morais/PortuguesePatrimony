window.onload = async function () {
    try {
        let guias = await $.ajax({
            url: "/api/guias",
            method: "get",
            dataType: "json"
        });
        let html = "";
        for (let guia of guias) {
            html += "<option value=" + guia.guia_id + ">" + guia.nomeguia +
                "</option>";
        }
        document.getElementById("guia").innerHTML = html;
    } catch (err) {
        console.log(err);
        // mensagem de erro para o utilizador      
    }

}


async function addMonumento() {
    try {
        let monumento = {
            nome: document.getElementById("nome").value,
            morada: document.getElementById("morada").value,
            latitude: document.getElementById("latitude").value,
            longitude: document.getElementById("longitude").value,
            descricao: document.getElementById("descricao").value,
            guiaID: parseInt(document.getElementById("guia").value)
        }
        alert(JSON.stringify(monumento));
        let result = await $.ajax({
            url: "/api/monumentos",
            method: "post",
            dataType: "json",
            data: JSON.stringify(monumento),
            contentType: "application/json"
        });
        alert(JSON.stringify(result));
    } catch (err) {
        console.log(err);
        // mensagem para o utilizador
    }
    async function filter() {
        try {
            let nomemonumento = document.getElementById("search").value;
            let monumentos = await $.ajax({
                url: "/api/monumentos?nomemonumento=" + nomemonumento,
                method: "get",
                dataType: "json"
            });
            loadMonumentos(monumentos);
        } catch (err) {
            let elemAside = document.getElementById("listaMonumentos");
            console.log(err);
            elemAside.innerHTML = "<h1> Page not found</h1>" +
                "<h2> Try again later</h2>";
        }
    }
}