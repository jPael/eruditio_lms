import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CiMemoPad } from "react-icons/ci";

import { stockData as data } from "./database/CS315/courseInfo";
import CourseLogo from "../../../assets/images/CS315/courseLogo.png";
import "./course.css";
import { getCourseData, getTaskData } from "../../../../slices/user";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function Course() {
	const userRole = useSelector((state) => state.auth.user.role);

	const { courseID } = useParams();
	const [courseData, setCourseData] = useState({});
	const [tasks, setTasks] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourseData(courseID)).then((result) => {
			setCourseData(result.payload);
		});
	}, [dispatch, courseID]);

	useEffect(() => {
		// const tasks = [];

		if (courseData?.tasks) {
			const tempTask = [];
			for (let i = 0; i < courseData.tasks.length; i++) {
				dispatch(getTaskData({ task: courseData.tasks[i] }))
					.then(unwrapResult)
					.then((result) => {
						tempTask.push(result);
					})
					.then(() => {
						setTasks(filterData(tempTask));
					});
			}
		}
	}, [dispatch, courseData.tasks]);

	// console.log(tasks);
	return (
		<div className="course">
			<div className="course-header">
				<img src={CourseLogo} alt="App dev logo" />
				<div className="header-description">
					<span className="course-name">{courseData.course_name}</span>
					<span className="course-schedule">{courseData.course_schedule}</span>
					<span className="course-instructor">{courseData.course_instructor}</span>
					<span className="course-code" onClick={() => copyToClipboard(courseID)}>
						{courseID}
					</span>
				</div>
				{userRole === 1 ? (
					<div className="header-actions">
						<Link to={`../createtask/${courseID}`}>
							<div className="header-create-task">Create task</div>
						</Link>
						<Link to={`../viewstudent/${courseID}`}>
							<div className="header-view-students">View Students</div>
						</Link>
					</div>
				) : null}
			</div>
			<div className="course-tasks">
				{tasks.length > 0 ? (
					tasks.map((task) => {
						console.log(task);
						return (
							<div className="course-task">
								<div className="task-icon">
									<CiMemoPad />
								</div>
								<div className="task-description">
									<span className="task-title">
										{/* http://localhost:3000/main/task/N3HvCK3XYy */}
										<Link to={`/main/task/${task.task_id}`}>{task.task}</Link>
									</span>
									<span className="task-schedule">{task.task_schedule}</span>
								</div>
							</div>
						);
					})
				) : (
					<div className="task-description">There are no tasks yet</div>
				)}
			</div>
		</div>
	);
}

//combine all tasks into one task array

const combineAllTasks = (tasks) => {
	const arr = [];

	console.log(tasks);
	if (!tasks) return [];
	for (let key in tasks) {
		tasks[key].forEach((e) => {
			// e.status = key;
			arr.push(e);
		});
	}

	return arr;
};

function filterData(arr) {
	const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== "") {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

async function copyToClipboard(text) {
	navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			alert("Write access granted!");
		}
	});

	try {
		await navigator.clipboard.writeText(text);
		alert("Copied to clipboard, You can now share the code with your students");
		/* Resolved - text copied to clipboard successfully */
	} catch (err) {
		console.error("Failed to copy: ", err);
		/* Rejected - text failed to copy to the clipboard */
	}
}

export default Course;
