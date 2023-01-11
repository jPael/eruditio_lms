const fs = require("fs");
const getData = require("./get-data");

const setData = (path, id, key, value, type = 2, overwrite = false) => {
	console.log(path, id, key, value, type);
	fs.access(`${path}/${id}.json`, (err) => {
		if (err) console.log("file does not exist!", err);
		else {
			let data = null;
			if (type === 1) {
				data = getData.getTeacherData(id);
				// console.log(data[key] instanceof Array, data[key]);
			} else if (type === 2) {
				data = getData.getStudentData(id);
			} else if (type === 3) {
				data = getData.getCourseData(id);
			} else if (type === 4) {
				data = getData.getTaskData(id);
			}

			if (overwrite) {
				data[key] = value;
			} else {
				if (data[key] instanceof Array) {
					data[key].push(value);
				} else {
					data[key] = value;
				}
			}
			writeIt(path, id, data);
		}
	});
};

const writeIt = (path, id, data) => {
	fs.writeFile(`${path}/${id}.json`, JSON.stringify(data), (err) => {
		if (err) console.log("Error writing file: " + err);
	});
};

module.exports = { setData };
