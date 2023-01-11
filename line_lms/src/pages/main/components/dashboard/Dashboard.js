import React from "react";
import { useSelector } from "react-redux";

import Student from "./components/student/Student.js";
import Teacher from "./components/teacher/Teacher.js";

import "./dashboard.css";

const Dashboard = (type) => {
	const { user } = useSelector((state) => state.auth);
	// const getType = () => {
	// 	if (type === "student") {
	// 		return <div>Student</div>;
	// 	} else if (type === "teacher") {
	// 		return <div>Teacher</div>;
	// 	}
	// };

	return (
		<div className="dashboard">
			{user.role === 2 ? (
				<Student user={user} />
			) : user.role === 1 ? (
				<Teacher user={user} />
			) : (
				<div>Not Found</div>
			)}
		</div>
	);
};

export default Dashboard;
