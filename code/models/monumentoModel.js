var pool = require("./connection");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.nomemonumento) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.nomemonumento + "%");
        }
        if (filterObj.monumento_id != null) {
            let sql = "SELECT monumento_id, nomemonumento, morada, latitude, longitude, descricao, nomeguia FROM monumento, guia WHERE monumento_guia_id = guia_id AND monumento_guia_id = ?";
            let monumentos = await pool.query(sql, filterObj.monumento_id);
            return { status: 200, data: monumentos };
        }
        let sql = "SELECT monumento_id, nomemonumento, morada, latitude, longitude, descricao, nomeguia FROM monumento, guia WHERE monumento_guia_id = guia_id" +
            filterQueries + " ORDER BY `monumento`.`monumento_id`";
        let monumentos = await pool.query(sql, filterValues);
        return { status: 200, data: monumentos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
module.exports.getOne = async function (monumento_id) {
    try {
        let sql = "SELECT * FROM monumento, guia WHERE monumento_guia_id = guia_id " +
            " AND monumento_id = ?";
        let monumentos = await pool.query(sql, [monumento_id]);
        if (monumentos.length > 0) {
            let monumento = monumentos[0]; // its only one

            sql = "SELECT reserva_id, nomereserva, nomeutilizador " +
                "FROM reserva, utilizador " +
                "reserva_user_id = user_id AND monumento_id = ?";
            let reservas = await pool.query(sql, [monumento_id]);

            monumento.reservas = reservas;

            return { status: 200, data: monumento };
        } else {
            return { status: 404, data: { msg: "Monumento not found for that id" } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.save = async function (monumento) {
    try {
        let sql = "INSERT INTO monumento(nomemonumento, morada, latitude, longitude, descricao, monumento_guia_id) VALUES (?,?,?,?,?,?)";
        let result = await pool.query(sql, [monumento.nomemonumento, monumento.morada, monumento.latitude, monumento.longitude, monumento.descricao, monumento.monumento_guia_id]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
