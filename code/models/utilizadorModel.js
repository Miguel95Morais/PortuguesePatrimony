var pool = require("./connection");

module.exports.signin = async function (utilizador) {
    try {
        let sql = "select UtilizadorID, Nome from Utilizador where Username = \"" + utilizador.username + "\" and Password = \"" + utilizador.password + "\";";
        let signin = await pool.query(sql);
        return { status: 200, data: signin };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.novoUtilizador = async function (utilizador) {
    try {
        let sqlUsername = "select UtilizadorID from Utilizador where Username = ?;";
        let UtilizadorID = await pool.query(sqlUsername, utilizador.username);
        if (UtilizadorID.length == 0) {
            let sql = "insert into Utilizador (Username, Pass, Nome) values (?,?,?);";
            let result = await pool.query(sql, [utilizador.username, utilizador.password, utilizador.nome]);
            return { status: 200, data: result };
        }
        else
            return null;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}