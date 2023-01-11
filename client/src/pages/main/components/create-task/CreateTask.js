import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./CreateTask.css";

import { createTask } from "../../../../slices/user";
import { clearMessage } from "../../../../slices/message";

function CreateTask() {
	const { courseID } = useParams();
	const [successful, setSuccessful] = useState(false);

	const dispatch = useDispatch();
	const { message } = useSelector((state) => state.message);

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	const initialValues = {
		taskName: "",
		deadline: "",
		taskDescription: "",
	};

	const validationSchema = Yup.object().shape({
		taskName: Yup.string().required("Task name is required"),
		deadline: Yup.date().required("Deadline is required"),
		taskDescription: Yup.string().required("Task description is required"),
	});

	const handleSubmit = (formValue, onSubmitProps) => {
		// {
		// 	"taskName": "Jason pael",
		// 	"deadline": "2022-12-07",
		// 	"taskDescription": "create a file program that etc. etc."
		// }
		// console.log(formValue);

		dispatch(createTask({ courseID, formValue }))
			.unwrap()
			.then(() => {
				onSubmitProps.resetForm();
				setSuccessful(true);
			})
			.catch(() => {
				setSuccessful(false);
			});
	};

	return (
		<>
			<div className="createTask-container">
				<div className="label">Create task</div>

				<div className="card">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<div className="form-section">
								<div className="input" id="task-name">
									<label htmlFor="taskName">Task name</label>
									<Field type="text" name="taskName" id="taskName" />
									<ErrorMessage name="taskName" component="div" className="alert alert-danger" />
								</div>
								<div className="input" id="task-deadline">
									{/* date input for the deadline */}
									<label htmlFor="deadline">Deadline</label>
									<Field type="date" name="deadline" id="deadline" />
									<ErrorMessage name="deadline" component="div" className="alert alert-danger" />
								</div>
							</div>
							<div className="form-section">
								<div className="input" id="task-description">
									{/* <label htmlFor="taskDescription">Task description</label> */}
									<Field
										as="textarea"
										placeholder="Enter description here"
										name="taskDescription"
										id="taskDescription"
									/>
									<br />

									<ErrorMessage
										name="taskDescription"
										component="div"
										className="alert alert-danger"
									/>
								</div>
							</div>
							<div className="form-section">
								<div className="input" id="task-button">
									<button className="button" type="submit">
										Create
									</button>
								</div>
							</div>
							{message && (
								<div className="form-section">
									<div
										className={`alert ${successful ? "alert-success" : "alert-danger"}`}
										role="alert"
									>
										{message}
									</div>
								</div>
							)}
						</Form>
					</Formik>
				</div>
			</div>
		</>
	);
}

export default CreateTask;
