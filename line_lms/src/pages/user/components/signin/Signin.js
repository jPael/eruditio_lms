import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../../../slices/auth";
import { clearMessage } from "../../../../slices/message";

import "./signin.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { getStudentData } from "../../../../slices/user";
import { FaWindows } from "react-icons/fa";

const Signin = () => {
	let navigate = useNavigate();

	const [loading, setLoading] = React.useState(false);
	const [userData, setUserData] = React.useState({});

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage()); // clear message when changing location
	}, [dispatch]);

	const initialValues = { usernameInput: "", passwordInput: "" };

	const validationSchema = Yup.object().shape({
		usernameInput: Yup.string().required("This field is required!"),
		passwordInput: Yup.string().required("This field is required!"),
	});

	const handleLogin = (formValue) => {
		const { usernameInput, passwordInput } = formValue;
		setLoading(true);

		dispatch(login({ usernameInput, passwordInput }))
			.then(unwrapResult)
			.then(() => {
				const userData = JSON.parse(localStorage.getItem("user"));

				dispatch(getStudentData(userData.school_id));
			})
			.then(() => {
				// setLoading(false);
				// navigate("/main/dashboard");
				window.location.reload();
			})
			.catch(() => {
				setLoading(false);
			});
	};

	// console.log("isLoggedIn: ", isLoggedIn);

	if (isLoggedIn) {
		return navigate("/main/dashboard");
	}

	return (
		<>
			<div className="card-header">
				<h1>Sign in</h1>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleLogin}
			>
				<Form>
					<div className="card-body">
						<label htmlFor="usernameInput">Username</label>
						{/* <input type="text" id="username-input" /> */}
						<Field name="usernameInput" type="text" className="user-input" />
						<ErrorMessage name="usernameInput" component="div" className="alert alert-danger" />

						<label htmlFor="passwordInput">Password</label>
						{/* <input type="password" id="password-input" /> */}
						<Field name="passwordInput" type="password" className="user-input" />
						<ErrorMessage name="passwordInput" component="div" className="alert alert-danger" />
					</div>
					<div className="card-footer">
						<Link>
							<span className="action-link">Forgot password?</span>
						</Link>
						<div className="actions">
							<Link to="/user/signup/teacher">
								<span className="action-link">Create account</span>
							</Link>
							{/* <input type="submit" value="Sign in" /> */}
							<button type="submit" disabled={loading}>
								{loading && <span className="spinner-border spinner-border-m"></span>}
								{/* <span className="spinner-border spinner-border-m"></span> */}
								Sign in
							</button>
						</div>
					</div>
				</Form>
			</Formik>
			{message && (
				<div className="form-group">
					<div className="alert alert-danger" role="alert">
						{message}
					</div>
				</div>
			)}
		</>
	);
};

export default Signin;
