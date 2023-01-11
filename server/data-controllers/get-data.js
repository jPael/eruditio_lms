const fs = require("fs");
const { builtinModules } = require("module");

const getStudentData = (id) => {
	const path = `./server/data/student/${id}.json`;

	const data = fs.readFileSync(path, "utf8");
	return JSON.parse(data);
};

const getTeacherData = (id) => {
	const path = `./server/data/teacher/${id}.json`;

	const data = fs.readFileSync(path, "utf8");
	return JSON.parse(data);
};

const getCourseData = (id) => {
	const path = `./server/data/courses/${id}.json`;

	try {
		const data = fs.readFileSync(path, "utf8");
		return JSON.parse(data);
	} catch {
		return null;
	}
};

const getTaskData = (id) => {
	const path = `./server/data/tasks/${id}.json`;
	try {
		const data = fs.readFileSync(path, "utf8");
		return JSON.parse(data);
	} catch {
		return null;
	}
};

module.exports = { getStudentData, getCourseData, getTeacherData, getTaskData };
