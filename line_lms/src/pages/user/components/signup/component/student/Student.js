import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registerStudent } from "../../../../../../slices/auth";
import { clearMessage } from "../../../../../../slices/message";
import { useNavigate } from "react-router-dom";

const Student = () => {
	const [successful, setSuccessful] = useState(false);

	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(clearMessage()); // clear message when changing location
	}, [dispatch]);

	const initialValues = {
		schoolID: "",
		course: "",
		yearlvl: "",
		block: "",
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		schoolID: Yup.string().required("School ID is required"),
		course: Yup.string().required("Course is required"),
		yearlvl: Yup.string().required("Year Level is required"),
		block: Yup.string().required("Block is required"),
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
		const { schoolID, course, yearlvl, block, firstname, lastname, email, username, password } =
			formValue;
		dispatch(
			registerStudent({
				schoolID,
				course,
				yearlvl,
				block,
				firstname,
				lastname,
				email,
				username,
				password,
			})
		)
			.unwrap()
			.then(() => {
				navigate("/signin");
				setSuccessful(true);
			})
			.catch(() => {
				setSuccessful(false);
			});
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
							<div className="form-section">
								<div className="input">
									<label htmlFor="id">School ID</label>
									{/* <input type="text" /> */}
									<Field name="schoolID" type="text" className="form-control" />
									<ErrorMessage name="schoolID" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="course">Course</label>
									{/* <input type="text" name="" id="" /> */}
									<Field name="course" type="text" className="form-control" />
									<ErrorMessage name="course" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="yearlvl">Year Level</label>
									{/* <input type="text" /> */}
									<Field name="yearlvl" type="text" className="form-control" />
									<ErrorMessage name="yearlvl" component="div" className="alert alert-danger" />
								</div>
								<div className="input">
									<label htmlFor="block">Block</label>
									{/* <input type="text" /> */}
									<Field name="block" type="text" className="form-control" />
									<ErrorMessage name="block" component="div" className="alert alert-danger" />
								</div>
							</div>
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

export default Student;
