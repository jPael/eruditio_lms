import React from "react";
import { Link } from "react-router-dom";

function Item({ course }) {
	return (
		<>
			<div className="teacher-card" key={course.course_ID}>
				<div className="teacher-card-header">
					<div className="teacher-card-logo">ad</div>
					<div className="teacher-card-description">
						<Link to={`/main/course/${course.course_ID}`}>
							<span className="teacher-card-title">{course.course_name}</span>
						</Link>
						<span className="teacher-card-schedule"> {course.course_schedule}</span>
						{/* <span className="teacher-card-instructor">Cherly Sardovia</span> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Item;
