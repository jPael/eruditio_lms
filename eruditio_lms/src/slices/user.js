import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import userServices from "../services/user.service";

export const getTaskData = createAsyncThunk(
	"user/getTaskData",
	async ({ task: task_code }, thunkAPI) => {
		try {
			const response = await userServices.getTaskData(task_code);
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const createTask = createAsyncThunk(
	"user/createTask",
	async ({ courseID, formValue }, thunkAPI) => {
		try {
			// console.log(courseID, formValue);
			const response = await userServices.createTask(courseID, formValue);
			thunkAPI.dispatch(setMessage(response.data.message));
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const addCourse = createAsyncThunk(
	"user/createCourse",
	async ({ classname, section, schedule, instructor }, thunkAPI) => {
		try {
			const response = await userServices.addCourse(classname, section, schedule, instructor);
			thunkAPI.dispatch(setMessage(response.data.message));
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const joinCourse = createAsyncThunk(
	"user/joinCourse",
	async ({ course_id, student_id }, thunkAPI) => {
		// console.log("slices - user: getting called...");
		// console.log("slices: ", course_id, student_id);
		try {
			const response = await userServices.joinCourse(course_id, student_id);
			thunkAPI.dispatch(setMessage(response.data.message));
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const getCourses = createAsyncThunk("user/getCourses", async (school_id, thunkAPI) => {
	try {
		const response = await userServices.getCourses(school_id);
		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(setMessage(message));
		return thunkAPI.rejectWithValue();
	}
});

export const getCourseData = createAsyncThunk("user/getCourseData", async (course_id, thunkAPI) => {
	try {
		const response = await userServices.getCourseData(course_id);
		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		thunkAPI.dispatch(setMessage(message));
		return thunkAPI.rejectWithValue();
	}
});

export const getTeacherData = createAsyncThunk(
	"user/getTeacherData",
	async (teacher_id, thunkAPI) => {
		try {
			const response = await userServices.getTeacherData(teacher_id);
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const getStudentData = createAsyncThunk(
	"user/getStudentData",
	async (student_id, thunkAPI) => {
		try {
			const response = await userServices.getStudentData(student_id);
			// console.log("slices: ", response.data);
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const uploadFiles = createAsyncThunk(
	"user/uploadFiles",
	async ({ user_id, task_id, data, type, index, setFileProgress, setLinkProgress }, thunkAPI) => {
		try {
			const response = await userServices.uploadFiles(
				user_id,
				task_id,
				data,
				type,
				index,
				setFileProgress,
				setLinkProgress
			);
			thunkAPI.dispatch(setMessage(response.data.message));
			return response.data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

// const initialState = user;

// const userSlice = createSlice({
// 	name: "user_data",
// 	initialState,
// 	extraReducers: {},
// });

// const userServices = {
// 	getTeacherInfo,
// 	getStudentInfo,
// 	addCourse,
// 	joinCourse,
// 	getCourses,
// 	getStudentData,
// };

// const { reducer } = userSlice;

// export default reducer;
