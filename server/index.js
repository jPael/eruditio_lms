const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const { pool } = require("./connection");
const {
	hashPassword,
	compparePassword,
	userRole,
	randomString,
	checkForDuplicate,
} = require("./util");

const api = require("./api_urls");
const database = require("./data-controllers/init");
const setDatabase = require("./data-controllers/set-data");
const getDatabase = require("./data-controllers/get-data");

const con_pool = pool();

const PORT = process.env.PORT || 3001;
const tableName = "users_tbl";

const app = express();
let corsOptions = {
	origin: "http://localhost:3000",
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./server/data/uploads/tasks/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(api.uploadLink, (req, res) => {
	res.send({ messange: `Link ${req.body} has been uploaded successfully` });
});

app.post(api.uploadFile, upload.single("files"), (req, res, next) => {
	const files = req.file;
	const { user_id, task_id } = req.body;

	const { submissions } = getDatabase.getTaskData(task_id);

	const submission_id = req.file.filename.split(".")[0];
	//get the specific element from the array that matches the user_id
	submissions.forEach((submission) => {
		if (submission.student_id === user_id) {
			submission.status = "submitted";
			submission.submission_type = "file";
			submission.submission_id = submission_id;
			submission.submission_name = req.file.filename;
			submission.submission_date = new Date().toLocaleString();
			submission.student_score = null;
		}
	});

	// console.log(user_id);
	// console.log(submissions);
	// console.log(submission_data);

	setDatabase.setData("./server/data/tasks", task_id, "submissions", submissions, 4, true);

	if (!files) {
		const error = new Error("Please choose files");
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send({ message: `Files ${files.originalname} uploaded successfully` });
});

app.post(api.getTaskData, (req, res) => {
	const { task_id } = req.body;

	const data = getDatabase.getTaskData(task_id);
	if (!data) res.send({ message: "No data found" });

	res.send(data || { message: "No data found" });
});

app.post(api.createTask, (req, res) => {
	// console.log(req.body);
	const { courseID: course_code, values } = req.body;

	con_pool.getConnection((err, connection) => {
		if (err) throw err;

		let taskID = "";

		while (true) {
			const temp_taskID = randomString(15);

			if (!checkForDuplicate(con_pool, temp_taskID, "tasks_tbl", "task_code")) {
				taskID = temp_taskID;
				break;
			}
		}

		const data = {
			task_code: taskID,
			course_id: course_code,
		};

		const sql = `INSERT INTO tasks_tbl SET ?`;

		connection.query(sql, data, (err, rows) => {
			connection.release();
			if (!err) {
				setDatabase.setData("./server/data/courses", course_code, "tasks", taskID, 3);
				database.initTask({ course_code, taskID, values });
				res.send({ message: "Task created successfully" });
			} else {
				res.send({ message: "Error creating task" });
				console.log(err);
			}
		});
	});
});

// let counter = 0

app.post(api.getCourseData, (req, res) => {
	const { course_id } = req.body;

	const data = getDatabase.getCourseData(course_id);

	if (!data) return;

	const instructor_ID = data.course_instructor;

	const instructorData = getDatabase.getTeacherData(instructor_ID);

	// console.log(counter, data);

	const instructor_fname = instructorData.firstname;
	const instructor_lname = instructorData.lastname;
	const instructor_fullname = instructor_fname + " " + instructor_lname;

	data.course_instructor = instructor_fullname;

	res.send(data);
});

app.post(api.getTeacherData, (req, res) => {
	const { teacher_id } = req.body;

	const data = getDatabase.getTeacherData(teacher_id);

	res.send(data);
});

app.post(api.getStudentData, (req, res) => {
	const { student_id } = req.body;

	const data = getDatabase.getStudentData(student_id);
	// console.log(student_id, data);
	res.send(data);
});

app.post(api.getCourses, (req, res) => {
	const { school_id } = req.body;
	const data = getDatabase.getStudentData(school_id);
	const courses = data.courses;

	let coursesDatas = [];

	courses.forEach((course) => {
		const courseData = getDatabase.getCourseData(course);

		if (courseData != null) coursesDatas.push(courseData);
	});
	res.send(coursesDatas);
});

app.post(api.addCourse, (req, res) => {
	con_pool.getConnection((err, connection) => {
		if (err) throw err;

		const { classname, section, schedule, instructor } = req.body;
		let code = "";

		while (true) {
			let curr_code = randomString(6);

			if (!checkForDuplicate(con_pool, curr_code, "courses_tbl", "code")) {
				code = curr_code;
				break;
			}
		}

		const sql = `INSERT INTO courses_tbl SET ?`;
		connection.query(sql, { code, name: classname, instructor, section, schedule }, (err, rows) => {
			connection.release();
			if (!err) {
				database.initCourse({ code, classname, instructor, section, schedule });
				setDatabase.setData("./server/data/teacher", instructor, "courses", code, 1);
				res.send({ message: "Course added successfully", code: code });
			} else {
				console.log("ERROR: ", err);
			}
		});
	});
});

// app.post("/test", (req, res) => {
// 	setDatabase.setData("./server/data/student", "12345", "courses", "test");
// });

app.post(api.joinCourse, (req, res) => {
	const { course_id, student_id } = req.body;
	const courseData = getDatabase.getCourseData(course_id);
	const { students } = courseData;

	if (students.includes(student_id)) return res.send({ message: "Already joined" });

	students.push(student_id);

	setDatabase.setData("./server/data/courses", course_id, "students", students);

	res.send(setDatabase.setData("./server/data/student", student_id, "courses", course_id));
});

app.post(api.login, (req, res) => {
	con_pool.getConnection((err, connection) => {
		if (err) throw err;

		const { username, password } = req.body;
		const sql = `SELECT * FROM ${tableName} WHERE username = ?`;

		connection.query(sql, [username], (err, rows) => {
			connection.release(); // return the connection to con_pool
			if (!err) {
				if (rows.length > 0) {
					const user = rows[0];
					const isMatch = compparePassword(password, user.password);
					if (isMatch) {
						res.json(user);
					} else {
						res.json({ message: "Incorrect password" });
					}
				} else {
					res.json({ message: "User not found" });
				}
			} else {
				console.log(err);
			}
		});
	});
});

app.post(api.registerStudent, (req, res) => {
	const { schoolID, course, yearlvl, block, firstname, lastname, email, username, password } =
		req.body;
	const hashedPassword = hashPassword(password);
	const datas = {
		school_id: schoolID,
		course,
		yearlvl,
		block,
		firstname,
		lastname,
		email,
		username,
		password: hashedPassword,
		role: 2,
	};
	const sql = `INSERT INTO ${tableName} SET ?`;

	con_pool.getConnection((err, connection) => {
		if (err) throw err;

		connection.query(sql, datas, (err, rows) => {
			connection.release(); // return the connection to con_pool
			if (!err) {
				// role, course, lvl, block, outputname
				// database.init(userRole(2), course, yearlvl, block, schoolID);
				database.initStudent(datas);
				// setDatabase.setStudentData(datas);
				res.send("Registered successfully!");
			} else {
				console.log(err);
			}
		});
	});
});

app.post(api.registerTeacher, (req, res) => {
	const { schoolID, firstname, lastname, email, username, password } = req.body;
	const hashedPassword = hashPassword(password);
	const datas = {
		school_id: schoolID,
		course: "",
		yearlvl: "",
		block: "",
		firstname,
		lastname,
		email,
		username,
		password: hashedPassword,
		role: 1,
	};
	const sql = `INSERT INTO ${tableName} SET ?`;

	con_pool.getConnection((err, connection) => {
		if (err) throw err;

		connection.query(sql, datas, (err, rows) => {
			connection.release(); // return the connection to con_pool
			if (!err) {
				database.initTeacher(datas);

				res.send("Registered successfully!");
			} else {
				console.log(err);
			}
		});
	});
});

app.listen(PORT, () => {
	console.log(`Server is running and listening on port ${PORT}`);
});
