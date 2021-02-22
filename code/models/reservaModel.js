var pool = require("./connection");

module.exports.getAll = async function () {
    try {
        let sql = "SELECT * FROM reserva";
        let reservas = await pool.query(sql);
        return { status: 200, data: reservas };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}