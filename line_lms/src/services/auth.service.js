import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

const register_teacher = (schoolID, firstname, lastname, email, username, password) => {
	// console.log("auth-service: " + schoolID);
	return axios.post(API_URL + "register_teacher", {
		schoolID,
		firstname,
		lastname,
		email,
		username,
		password,
	});
};

const register_student = (
	schoolID,
	course,
	yearlvl,
	block,
	firstname,
	lastname,
	email,
	username,
	password
) => {
	return axios.post(API_URL + "register_student", {
		schoolID,
		course,
		yearlvl,
		block,
		firstname,
		lastname,
		email,
		username,
		password,
	});
};

const login = (username, password) => {
	return axios
		.post(API_URL + "login", {
			username,
			password,
		})
		.then((response) => {
			if (response.data.school_id) {
				//################ we store the data here
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("user_data");
};

const authServices = { register_teacher, register_student, login, logout };

export default authServices;
