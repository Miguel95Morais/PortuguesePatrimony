var pool = require("./connection");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.nome) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.nome + "%");
        }
        if (filterObj.guia) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.guia + "%");
        }
        let sql = "SELECT * FROM monumento, guia WHERE monumento.guia_id = guia.guia_id" +
            filterQueries;
        console.log(sql);
        console.log(filterValues);
        let monumentos = await pool.query(sql, filterValues);
        return { status: 200, data: monumentos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
module.exports.getOne = async function (monumento_id) {
    try {
        let sql = "SELECT * FROM monumento, guia WHERE monumento.guia_id = guia.guia_id " +
            " AND monumento_id = ?";
        let monumentos = await pool.query(sql, [monumento_id]);
        if (monumentos.length > 0) {
            let monumento = monumentos[0]; // its only one

            sql = "SELECT reserva_id, reserva.nome AS nome, utilizador.nome AS utilizador " +
                "FROM reserva,utilizador " +
                "reserva.utilizador_id = utilizador_id AND monumento_id = ?";
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
        let sql = "INSERT INTO monumento(nome, morada, latitude, longitude, descricao, monumento_guia_id) VALUES (?,?,?,?,?,?)";
        let result = await pool.query(sql, [monumento.nome, monumento.morada, monumento.latitude, monumento.longitude, monumento.descricao, monumento.monumento_guia_id]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
