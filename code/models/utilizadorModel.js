var pool = require("./connection");

module.exports.signin = async function (utilizador) {
    try {
        let sql = "select user_id, nome from utilizador where username = \"" + utilizador.username + "\" and password = \"" + utilizador.password + "\";";
        let signin = await pool.query(sql);
        return { status: 200, data: signin };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.novoUtilizador = async function (utilizador) {
    try {
        let sqlUsername = "select user_id from utilizador where username = ?;";
        let user_id = await pool.query(sqlUsername, utilizador.username);
        if (user_id.length == 0) {
            let sql = "insert into utilizador (username, pass, nome) values (?,?,?);";
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