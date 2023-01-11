const { compareSync } = require("bcrypt");
const fs = require("fs");
const { formatCourseData, formatTaskData } = require("../util");
const getData = require("./get-data");

const initStudent = (data) => {
	const path_student = `./server/data/student`;
	const prepareJSON = {
		id: data.school_id,
		firstname: data.firstname,
		lastname: data.lastname,
		course: data.course,
		yearlvl: data.yearlvl,
		block: data.block,
		email: data.email,
		courses: [],
	};

	fs.access(path_student, (err) => {
		if (err) {
			fs.mkdir(path_student, { recursive: true }, (err) => {
				if (err) console.log(err);
				else {
				}
			});
		} else {
			fs.writeFile(`${path_student}/${data.school_id}.json`, JSON.stringify(prepareJSON), (err) => {
				if (err) {
					console.log("Error creating file: " + err);
				}
			});
		}
	});
};

const initTeacher = (data) => {
	const path_teacher = `./server/data/teacher`;
	const outputname = data.school_id;
	const prepareJSON = {
		school_id: data.school_id,
		firstname: data.firstname,
		lastname: data.lastname,
		email: data.email,
		courses: [],
	};

	fs.access(path_teacher, (err) => {
		if (err) {
			fs.mkdir(path_teacher, { recursive: true }, (err) => {
				if (err) console.log(err);
			});
		} else {
			fs.writeFile(`${path_teacher}/${outputname}.json`, JSON.stringify(prepareJSON), (err) => {
				if (err) console.log("Error creating file: " + err);
			});
		}
	});
};

const initCourse = (data) => {
	const path_course = "./server/data/courses";
	const filename = `${data.code}.json`;
	const formattedData = formatCourseData(data);
	fs.access(path_course, (err) => {
		if (err) {
			fs.mkdir(path_course, { recursive: true }, (err) => {
				if (err) console.log(err);
			});
		} else {
			fs.mkdir(path_course, { recursive: true }, (err) => {
				if (err) console.log(err);
				else {
					fs.writeFile(`${path_course}/${filename}`, JSON.stringify(formattedData), (err) => {
						if (err) {
							console.log("Error creating file: " + err);
						}
					});
				}
			});
		}
	});
};

const initTask = (data) => {
	console.log("init JS", data);
	const { course_code, taskID: task_code, values } = data;
	const { taskName: task_name, deadline, taskDescription: task_description } = values;
	const formattedData = formatTaskData({
		course_code: course_code,
		task_id: task_code,
		task_deadline: deadline,
		task_name: task_name,
		task_description: task_description,
	});

	// "student_id": "1",
	// "type": "file",
	// "id": "someID",
	// "name": "somefile.pdf",
	// "date": "2021-12-12",
	// "status": "submitted"

	const courseData = getData.getCourseData(course_code);
	const students = courseData.students;

	students.forEach((student) => {
		console.log("init JS", student);
		const submission = {
			status: "not submitted",
			student_id: student,
			submission_type: null,
			submission_id: null,
			submission_name: null,
			submission_date: null,
			student_score: null,
		};

		formattedData.submissions.push(submission);
	});

	const path_task = "./server/data/tasks";
	const filename = `${task_code}.json`;

	fs.access(path_task, (err) => {
		if (err) {
			fs.mkdir(path_task, { recursive: true }, (err) => {
				if (err) console.log(err);
			});
		} else {
			fs.mkdir(path_task, { recursive: true }, (err) => {
				fs.writeFile(`${path_task}/${filename}`, JSON.stringify(formattedData), (err) => {
					if (err) {
						console.log("Error creating file: " + err);
					}
				});
			});
		}
	});
};

module.exports = { initStudent, initTeacher, initCourse, initTask };
