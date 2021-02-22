var pool = require("./connection");

module.exports.getAll = async function () {
    try {
        let sql = "SELECT * FROM guia";
        let guias = await pool.query(sql);
        return { status: 200, data: guias };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}