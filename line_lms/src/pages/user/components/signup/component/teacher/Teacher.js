import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerTeacher } from "../../../../../../slices/auth";
import { clearMessage } from "../../../../../../slices/message";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
	const navigate = useNavigate();

	const [successful, setSuccessful] = useState(false);

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage()); // clear message when changing location
	}, [dispatch]);

	const initialValues = {
		schoolID: "",
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
		// confirmPassword: "",
	};

	const validationSchema = Yup.object().shape({
		schoolID: Yup.string().required("School ID is required"),
		firstname: Yup.string().required("Firstname is required"),
		lastname: Yup.string().required("Lastname is required"),
		email: Yup.string().email("Email is invalid").required("Email is required"),
		username: Yup.string().required("Username is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.max(40, "Password must be at most 40 characters")
			.required("Password is required"),
		confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
	});

	const handleRegister = (formValue) => {
		const { schoolID, firstname, lastname, email, username, password } = formValue;
		// schoolID,
		// firstname,
		// lastname,
		// email,
		// password,
		dispatch(registerTeacher({ schoolID, firstname, lastname, email, username, password }))
			.unwrap()
			.then(() => {
				setSuccessful(true);
				navigate("/user/signin");
			})
			.catch(() => {
				setSuccessful(false);
			});

		if (isLoggedIn) {
			return navigate("/user/signin");
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleRegister}
			>
				<Form>
					{!successful && (
						<>
							<span className="form-captions">Personal info</span>
							<div className="form-section">
								<div className="input">
									<label htmlFor="firstname-input">Firstname</label>
									{/* <input type="text" /> */}
									<Field name="firstname" type="text" className="form-control" />
									<ErrorMessage name="firstname" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="lastname-input">Lastname</label>
									{/* <input type="text" /> */}
									<Field name="lastname" type="text" className="form-control" />
									<ErrorMessage name="lastname" component="div" className="alert alert-danger" />
								</div>
							</div>
							<div className="form-section">
								<div className="inpu">
									<label htmlFor="schoolID">School ID</label>
									<Field name="schoolID" type="text" className="form-control" />
									<ErrorMessage name="schoolID" component="div" className="alert alert-danger" />
								</div>
							</div>
							<div></div>
							<div className="form-section">
								<div className="input">
									<label htmlFor="email-input">Email</label>
									{/* <input type="text" /> */}
									<Field name="email" type="text" className="form-control" />
									<ErrorMessage name="email" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="username-input">Username</label>
									{/* <input type="text" /> */}
									<Field name="username" type="text" className="form-control" />
									<ErrorMessage name="username" component="div" className="alert alert-danger" />
								</div>

								<div className="input">
									<label htmlFor="password-input">Password</label>
									{/* <input type="password" name="" id="" /> */}
									<Field name="password" type="password" className="form-control" />
									<ErrorMessage name="password" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="confirm-password-input">Confirm password</label>
									{/* <input type="password" name="" id="" /> */}
									<Field name="confirmPassword" type="password" className="form-control" />
									<ErrorMessage
										name="confirmPassword"
										component="div"
										className="alert alert-danger"
									/>
								</div>
							</div>
							<div className="card-footer">
								<div className="actions">
									<button type="submit" value="Sign up">
										Sign up
									</button>
								</div>
							</div>
						</>
					)}
				</Form>
			</Formik>
			{message && (
				<div className="form-group">
					<div className={successful ? "alert alert-success" : "alert alert-danger"}>{message}</div>
				</div>
			)}
		</>
	);
};

export default Teacher;
