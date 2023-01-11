import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const registerTeacher = createAsyncThunk(
	"auth/register_teacher",
	async ({ schoolID, firstname, lastname, email, username, password }, thunkAPI) => {
		// console.log("auth-slice: " + schoolID);
		try {
			const response = await AuthService.register_teacher(
				schoolID,
				firstname,
				lastname,
				email,
				username,
				password
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

export const registerStudent = createAsyncThunk(
	"auth/register_student",
	async (
		{ schoolID, course, yearlvl, block, firstname, lastname, email, username, password },
		thunkAPI
	) => {
		try {
			const response = await AuthService.register_student(
				schoolID,
				course,
				yearlvl,
				block,
				firstname,
				lastname,
				email,
				username,
				password
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

export const login = createAsyncThunk(
	"auth/login",
	async ({ usernameInput, passwordInput }, thunkAPI) => {
		try {
			const data = await AuthService.login(usernameInput, passwordInput);
			return { user: data };
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

export const logout = createAsyncThunk("auth/logout", async () => {
	await AuthService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[registerTeacher.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
		},
		[registerTeacher.rejected]: (state, action) => {
			state.isLoggedIn = false;
		},
		[registerStudent.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
		},
		[registerStudent.rejected]: (state, action) => {
			state.isLoggedIn = false;
		},
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		[login.rejected]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		[logout.fulfilled]: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

const { reducer } = authSlice;
export default reducer;
