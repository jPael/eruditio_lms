import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData, getStudentData, getTaskData } from "../../../../../../slices/user";

import Item from "./component/item/Item";

function Student(user) {
	// const { user: userData } = useSelector((state) => state.auth);
	const userID = useSelector((state) => state.auth.user.school_id);

	const dispatch = useDispatch();
	//get all courses and its data
	const [data, setData] = useState({});
	const [taskCodes, setTaskCodes] = useState([]);
	const [allTasks, setAllTasks] = useState({ upcoming: [], missing: [] });

	// const [courseDatas, setCourseDatas] = useState([]);

	useEffect(() => {
		dispatch(getStudentData(userID))
			.then(unwrapResult)
			.then((result) => {
				setData(result);
			});
	}, [dispatch, userID]);

	useEffect(() => {
		const tasks = [];

		if (data.courses) {
			for (let i = 0; i < data.courses.length; i++) {
				dispatch(getCourseData(data.courses[i]))
					.then(unwrapResult)
					.then((result) => {
						if (!(result.tasks === undefined)) {
							result.tasks.forEach((task) => {
								tasks.push(task);
							});
						}
					})
					.then(() => {
						setTaskCodes(filterData(tasks));
					});
			}
		}
	}, [dispatch, data.courses]);

	useEffect(() => {
		// const tasks = [];
		const upcoming = [];
		const missing = [];

		for (let i = 0; i < taskCodes.length; i++) {
			dispatch(getTaskData({ task: taskCodes[i] }))
				.then(unwrapResult)
				.then((result) => {
					// tasks.push(result);
					const { task_schedule } = result;

					if (isPassDue(task_schedule)) {
						missing.push(result);
					} else {
						upcoming.push(result);
					}
				})
				.then(() => {
					setAllTasks({ upcoming, missing });
				});
		}
	}, [dispatch, taskCodes]);

	// console.log(data, allTasks);
	// console.log("data; ", data);
	// console.log("tasks: ", allTasks);
	// console.log("taskCodes: ", taskCodes);
	return (
		<>
			{/* <div>beanss</div> */}
			<div className="greeting-container">
				<span>Hello,</span>
				<span className="greeting-username">{`${user.user.firstname} ${user.user.lastname}`}</span>
			</div>
			<div className="tasks">
				<div className="upcoming">
					<span className="label">Tasks</span>
					<div className="task-lists">
						{allTasks.upcoming.length > 0
							? allTasks.upcoming.map((task) => {
									return <Item task={task} />;
							  })
							: null}
					</div>
				</div>
				<div className="missing">
					<span className="label">Missing</span>
					<div className="task-lists">
						{allTasks.missing.length > 0
							? allTasks.missing.map((task) => {
									return <Item task={task} />;
							  })
							: null}
					</div>
				</div>
			</div>
		</>
	);
}

function filterData(arr) {
	const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== "") {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

// check if task is pass due

function isPassDue(deadline) {
	const dueDate = new Date(deadline);
	const currentDate = new Date();
	if (dueDate < currentDate) {
		return true;
	} else {
		return false;
	}
}

export default Student;
