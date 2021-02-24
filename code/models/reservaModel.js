var pool = require("./connection");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.nomereserva) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.nomereserva + "%");
        }
        if (filterObj.reserva_id != null) {
            let sql = "SELECT reserva_id, nomereserva, nomemonumento, nomeutilizador FROM reserva, monumento, utlizador WHERE reserva_monumento_id = monumento_id AND reserva_user_id = user_id AND reserva_monumento_id = ? AND reserva_user_id = ?";
            let reservas = await pool.query(sql, filterObj.reserva_id);
            return { status: 200, data: reservas };
        }
        let sql = "SELECT reserva_id, nomereserva, nomemonumento, nomeutilizador FROM reserva, monumento, utilizador WHERE reserva_monumento_id = monumento_id AND reserva_user_id = user_id" +
            filterQueries + " ORDER BY `reserva`.`reserva_id`";
        let reservas = await pool.query(sql, filterValues);
        return { status: 200, data: reservas };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
module.exports.save = async function (reserva) {
    try {
        let sql = "INSERT INTO reserva(nomereserva, reserva_user_id, reserva_monumento_id) VALUES (?,?,?)";
        let result = await pool.query(sql, [reserva.nomereserva, reserva.reserva_user_id, reserva.reserva_monumento_id]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}