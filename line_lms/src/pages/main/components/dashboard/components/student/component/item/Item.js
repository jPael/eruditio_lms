import React from "react";
import { Link } from "react-router-dom";

function Item(props) {
	// console.log(props);
	// console.log(Object.keys(props).length, Object.keys(props).length === 0);
	return (
		<>
			{/* <span className="label">Tasks</span> */}
			{/* http://localhost:3000/course/U148iI/1 */}
			{Object.keys(props).length > 0 ? (
				<Link to={`/main/task/${props.task.task_id}`}>
					<div className="task">
						{/* <div className="task-course">
						<span>App Dev</span>
					</div> */}
						<div className="task-deadline">
							{/* <span>Due </span> <span className="date-text">tomorrow</span> */}
							<span>{props.task.task_schedule}</span>
						</div>
						<div className="task-name">
							<ul>
								{/* <li>Final Project</li> */}
								<li>{props.task.task}</li>
							</ul>
						</div>
					</div>
				</Link>
			) : null}
		</>
	);
}

export default Item;
