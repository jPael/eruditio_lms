import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCourse } from "../../../../slices/user";
import { clearMessage } from "../../../../slices/message";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import "./create-course.css";

function CreateCourse() {
	// get the user from the redux store

	const [successful, setSuccessful] = useState(false);

	const { message } = useSelector((state) => state.message);
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage()); // clear message when changing location
	}, [dispatch]);

	const initialValues = {
		classname: "",
		section: "",
		schedule: "",
		instructor: user.school_id,
	};

	const validationSchema = Yup.object().shape({
		classname: Yup.string().required("Class Name is required"),
		section: Yup.string().required("Section is required"),
		schedule: Yup.string().required("schedule is required"),
	});

	const handleRegister = (formValue, onSubmitProps) => {
		const { classname, section, schedule, instructor } = formValue;
		dispatch(addCourse({ classname, section, schedule, instructor }))
			.unwrap()
			.then(() => {
				setSuccessful(true);
				onSubmitProps.resetForm();
			})
			.catch(() => {
				setSuccessful(false);
			});
	};

	return (
		<div className="create-course-container">
			<div className="create-course-header">
				<div className="create-course-title">Create Course</div>
			</div>
			<div className="create-course-body">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleRegister}
				>
					<Form>
						<div className="create-course-form">
							<div className="create-course-form-group">
								<label htmlFor="classname" className="create-course-form-label">
									Class name
								</label>
								<Field name="classname" type="text" className="create-course-form-input" />
								<ErrorMessage name="classname" component="div" className="alert alert-danger" />
							</div>
							<div className="create-course-form-group">
								<label htmlFor="section" className="create-course-form-label">
									Section
								</label>

								<Field name="section" type="text" className="create-course-form-input" />
								<ErrorMessage name="section" component="div" className="alert alert-danger" />
							</div>
							<div className="create-course-form-group">
								<label htmlFor="schedule" className="create-course-form-label">
									Schedule
								</label>

								<Field name="schedule" type="text" className="create-course-form-input" />
								<ErrorMessage name="schedule" component="div" className="alert alert-danger" />
							</div>
							<div className="create-course-form-group">
								<button type="submit" className="create-course-form-submit primary-submit">
									Create
								</button>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
			{message && (
				<div className="form-group">
					<div className={successful ? "alert alert-success" : "alert alert-danger"}>{message}</div>
				</div>
			)}
		</div>
	);
}

export default CreateCourse;
