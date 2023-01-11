import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTaskData } from "../../../../../slices/user";

function Card({ data }) {
	const [allTasks, setAllTasks] = useState({ upcoming: [], missing: [] });

	const dispatch = useDispatch();

	useEffect(() => {
		// const tasks = [];
		const upcoming = [];
		const missing = [];

		for (let i = 0; i < data.tasks.length; i++) {
			dispatch(getTaskData({ task: data.tasks[i] }))
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
	}, [dispatch, data.tasks]);

	// console.log(allTasks);
	return (
		<div className="card">
			<div className="card-header">
				<img src={data.course_icon} alt="" />
				<div className="card-header-description">
					<Link to={`/main/course/${data.course_ID}`}>
						<span className="course-name">{data.course_name}</span>
					</Link>
					<span className="course-schedule">{data.course_schedule}</span>
					<span className="course-instructor">{data.course_instructor}</span>
				</div>
			</div>
			{data.userRole === 2 ? (
				<div className="card-body">
					<div className="course-task">
						<div className="missing-container">
							<span className="task-type">Missing</span>
							{allTasks.missing.length > 0 ? (
								allTasks.missing.map((task) => {
									return (
										<div className="task" key={task.task}>
											<Link to={`/main/task/${task.task_id}`}>
												<span className="task-name">{task.task}</span>
											</Link>
											<span className="task-schedule">{task.task_schedule}</span>
										</div>
									);
								})
							) : (
								<div className="task">
									<span className="task-name">No missing tasks</span>
								</div>
							)}
						</div>

						<span className="task-type">Upcoming</span>
						<div className="upcoming-container">
							{allTasks.upcoming.length > 0 ? (
								allTasks.upcoming.map((task) => {
									return (
										<div className="task" key={task.task}>
											<Link to={`/course/${task.task_id}`}>
												<span className="task-name">{task.task}</span>
											</Link>
											<span className="task-schedule">{task.task_schedule}</span>
										</div>
									);
								})
							) : (
								<div className="task">
									<span className="task-name">No upcoming tasks</span>
								</div>
							)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

function isPassDue(deadline) {
	const dueDate = new Date(deadline);
	const currentDate = new Date();
	if (dueDate < currentDate) {
		return true;
	} else {
		return false;
	}
}

export default Card;

/*

{data.tasks.missing.length > 0 && data.tasks.upcoming.length > 0 ? (
						(data.tasks.missing.length === 0 ? (
							<span className="task-name">No missing tasks</span>
						) : (
							data.tasks.missing.map((task) => {
								return (
									<>
										<span className="task-type">Missing</span>
										<div className="missing-container">
											<div className="task" key={task.task}>
												<span className="task-name">{task.name}</span>
												<span className="task-schedule">{task.task_schedule}</span>
											</div>
										</div>
									</>
								);
							})
						),
						data.tasks.upcoming.length === 0 ? (
							<span className="task-name">No upcoming tasks</span>
						) : (
							data.tasks.upcoming.map((task) => {
								return (
									<>
										<span className="task-type">Upcoming</span>
										<div className="upcoming-container">
											<div className="task" key={task.task}>
												<span className="task-name">{task.name}</span>
												<span className="task-schedule">{task.task_schedule}</span>
											</div>
										</div>
									</>
								);
							})
						))
					) : (
						<span className="task-name">No Tasks</span>
					)
					}


*/
