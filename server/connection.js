const mysql = require("mysql");

const pool = () => {
	return mysql.createPool({
		connectionLimit: 10,
		host: "localhost",
		user: "root",
		password: "",
		database: "eruditio_db",
	});
};

module.exports = {
	pool,
};
