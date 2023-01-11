import axios from "axios";
import authHeader from "./auth-header";
import { generateRandomString } from "./util";

const API_URL = "http://localhost:3001/api/user/";

const getTeacherInfo = () => {
	return axios.get(API_URL + "teacher");
};

const getStudentInfo = () => {
	return axios.get(API_URL + "student");
};

const getCourses = (school_id) => {
	return axios.post(API_URL + "getcourses", { school_id });
};

const addCourse = (classname, section, schedule, instructor) => {
	return axios.post(API_URL + "addcourse", {
		classname,
		section,
		schedule,
		instructor,
	});
};

const joinCourse = (course_id, student_id) => {
	return axios.post(API_URL + "joincourse", {
		course_id,
		student_id,
	});
};

const getStudentData = (student_id) => {
	return axios.post(API_URL + "getstudentdata", {
		student_id,
	});
};

const getCourseData = (course_id) => {
	return axios.post(API_URL + "getcoursedata", {
		course_id,
	});
};

const getTeacherData = (teacher_id) => {
	return axios.post(API_URL + "getteacherdata", {
		teacher_id,
	});
};

const createTask = (courseID, values) => {
	return axios.post(API_URL + "createtask", {
		courseID,
		values,
	});
};

const getTaskData = (task_id) => {
	return axios.post(API_URL + "gettaskdata", {
		task_id,
	});
};

const uploadFiles = (user_id, task_id, data, type, index, setFileProgress, setLinkProgress) => {
	if (type === "file") {
		const newName = generateRandomString(15);
		const extension = data.name.split(".")[data.name.split(".").length - 1];

		const form = new FormData();
		form.append("files", data, `${newName}.${extension}`);
		form.append("user_id", user_id);
		form.append("task_id", task_id);
		form.append("submission_id", newName);

		return axios.post(API_URL + "uploadfile", form, {
			onUploadProgress: (progressEvent) => {
				const progressPercent = (progressEvent.loaded / progressEvent.total) * 100;
				// setProgress((progress) => {
				// 	console.log(progress);
				// });

				//update the setProgress with the new array
				setFileProgress((prevProgress) => {
					// console.log(prevProgress);
					// prevProgress.push()
					// console.log(prevProgress);
					prevProgress[index] = progressPercent;
					return [...prevProgress];
				});
			},
		});
	} else if (type === "link") {
		console.log("uploading link");
		return axios.post(API_URL + "uploadlink", data, {
			onUploadProgress: (progressEvent) => {
				const progressPercent = (progressEvent.loaded / progressEvent.total) * 100;
				// setProgress((progress) => {
				// 	console.log(progress);
				// });

				//update the setProgress with the new array
				setLinkProgress((prevProgress) => {
					// console.log(prevProgress);
					// prevProgress.push()
					// console.log(prevProgress);
					prevProgress[index] = progressPercent;
					return [...prevProgress];
				});
			},
		});
	}
};

const userServices = {
	getTeacherInfo,
	getStudentInfo,
	addCourse,
	joinCourse,
	getCourses,
	getStudentData,
	getTeacherData,
	getCourseData,
	createTask,
	getTaskData,
	uploadFiles,
};

export default userServices;
