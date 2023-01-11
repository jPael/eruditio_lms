const bcrypt = require("bcrypt");
const mysql = require("mysql");

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

const compparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

const userRole = (role) => {
	const roles = ["teacher", "student", "admin"];
	return roles[role - 1];
};

const randomString = (length) => {
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	var result = "";
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

const checkForDuplicate = (pool, code, table, column) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;

		const sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
		connection.query(sql, [code], (err, rows) => {
			connection.release();
			if (!err) {
				if (rows.length > 0) {
					return true;
				} else {
					return false;
				}
			} else {
				console.log(err);
			}
		});
	});
};

const formatCourseData = (data) => {
	const { code, classname, instructor, section, schedule } = data;

	const fData = {
		course_ID: code,
		course_icon: "CourseIcon",
		course_name: classname,
		course_schedule: schedule,
		course_instructor: instructor,
		tasks: [],
	};

	return fData;
};

// {
// 	"task_id": "1",
// 	"task_schedule": "Due on Nov 1",
// 	"task": "Procrastination"
// }

const formatTaskData = (data) => {
	const { course_code, task_id, task_deadline, task_name, task_description } = data;

	const fData = {
		course_code,
		task_id: task_id,
		task_schedule: task_deadline,
		task: task_name,
		task_description: task_description,
		submissions: [],
	};

	return fData;
};
module.exports = {
	hashPassword,
	compparePassword,
	userRole,
	randomString,
	checkForDuplicate,
	formatCourseData,
	formatTaskData,
};
