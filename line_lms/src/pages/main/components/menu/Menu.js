import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "../../../assets/images/main/icons/Dashboard.png";
import CoursesIcon from "../../../assets/images/main/icons/courses.png";
import AppDevCourse from "../../../assets/images/CS315/courseLogo.png";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCourseData } from "../../../../slices/user";

const Menu = ({ menuOpen, user }) => {
	const [courses, setCourses] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		// const tempDatas = [];
		if (!(user.courses === undefined)) {
			user.courses.forEach((course) => {
				dispatch(getCourseData(course))
					.then(unwrapResult)
					.then((result) => {
						setCourses((courses) => [...courses, result].filter((data) => data !== ""));
						// tempDatas.push(result);
					});
				// setCourses((courses) => [...courses, filterData(tempDatas)]);
			});
		}
	}, [dispatch, user.courses]);

	// console.log(courses);

	// console.log(user);
	const location = useLocation();
	const { pathname } = location;
	const paths = pathname.split("/");
	const pageLocation = paths[paths.length - 1];

	// const selected = pathname.split("/")[2];

	return (
		<div className={`menu ${menuOpen ? "show" : "hide"}`}>
			<div className="menu-links-container">
				<Link to="dashboard">
					<div
						className={`menu-link ${
							pageLocation === "dashboard" || pageLocation === "" ? "selected" : null
						}`}
					>
						<img src={DashboardIcon} alt="dashboardIcon" />
						<span>Dashboard</span>
					</div>
				</Link>

				<Link to="courses">
					<div className={`menu-link ${pageLocation === "courses" ? "selected" : ""}`}>
						<img src={CoursesIcon} alt="CoursesIcon" />
						<span>Courses</span>
					</div>
				</Link>
			</div>
			<div className="menu-courses-link-container">
				{/* <Link to={`course/${user.code}`}> */}
				{/* <Link to="course/CS315">
					<div className={`menu-courses-link  ${pageLocation === "course" ? "selected" : ""}`}>
						<img src={AppDevCourse} alt="" />
						<div className="course-description">
							<span>App Dev</span>
							<span>Monday | 2:30 - 4:00 PM</span>
							<span>Cherly Sardovia</span>
						</div>
					</div>
				</Link> */}
				{courses.map((course) => (
					<Link key={course.code} to={`course/${course.course_ID}`}>
						<div
							className={`menu-courses-link  ${
								pageLocation === course.course_ID ? "selected" : ""
							}`}
						>
							<img src={AppDevCourse} alt="" />
							<div className="course-description">
								<span>{course.course_name}</span>
								<span>{course.course_schedule}</span>
								<span>{course.course_instructor}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

function filterData(arr) {
	const newArr = [];

	for (let i = 0; i < arr.length; i++) {
		newArr.push(arr[i]);
	}

	return newArr;
}

export default Menu;
