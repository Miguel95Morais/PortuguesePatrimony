async function checkSignIn() {
    var username = document.getElementById('Username').value;
    var password = document.getElementById('Password').value;
    let utilizador = {
        Username: username,
        Password: password
    }
    if (username.length == 0)
        alert("Insert Username ", "");
    else if (password.length == 0)
        alert("Insert Password ", "");
    else {
        try {
            let info = await $.ajax({
                url: "/api/utilizadores/SignInInfo/",
                method: "get",
                dataType: "json",
                data: utilizador,
                contentType: "application/json"

            });
            if (info[0] != null) {
                await alert("Sign In successful!", "");
                sessionStorage.setItem("nome", info[0].Nome);
                sessionStorage.setItem("utilizadorID", info[0].UtilizadorID);
                window.location = "index.html";
            }
            else
                await alert("Username or password are wrong!", "");;
        } catch (err) {

            console.log(err);
        }
    }
}


async function addUtilizador() {
    let newUsername = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let nome = document.getElementById("nome").value;
    if (newUsername.length == 0)
        alert("Insert username ", "");
    else if (password.length == 0)
        alert("Insert password ", "");
    else if (nome.length == 0)
        alert("Insert nome ", "");
    else {
        let utilizador = {
            Username: username,
            Password: password,
            nome: nome,
        }
        try {
            let result = await $.ajax({
                url: "/api/utilizadores/novoUtilizador",
                method: "post",
                dataType: "json",
                data: JSON.stringify(utilizador),
                contentType: "application/json"
            });
            if (result == null) {
                alert("Username is being used, please try a new one!", "");
            }
            alert("Utilizador registered")
        } catch (err) {
            console.log(err);
        }
    }
}
