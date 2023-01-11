import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Teacher from "./component/teacher/Teacher";
import Student from "./component/student/Student";

import "./signup.css";

const Signup = () => {
	const param = useParams();

	const navigate = useNavigate();
	const [userType, setUserType] = useState(param.type);

	const handleChange = (e) => {
		navigate("../signup/" + e.target.value);
		setUserType(e.target.value);
	};

	return (
		<>
			<div className="card-header">
				<h1>Sign up</h1>
			</div>
			<div className="card-body">
				<div className="user-classification">
					<div className="user-type-option">
						<input
							className="user-type-radio"
							type="radio"
							name="user-type"
							id="user-type-teacher"
							value="teacher"
							checked={userType === "teacher"}
							onChange={handleChange}
						/>
						<label htmlFor="user-type-teacher">Teacher</label>
					</div>
					<div className="user-type-option">
						<input
							className="user-type-radio"
							type="radio"
							name="user-type"
							id="user-type-student"
							value="student"
							checked={userType === "student"}
							onChange={handleChange}
						/>
						<label htmlFor="user-type-student">Student</label>
					</div>
				</div>
				{userType === "teacher" ? <Teacher /> : userType === "student" ? <Student /> : ""}
			</div>
		</>
	);
};

export default Signup;
