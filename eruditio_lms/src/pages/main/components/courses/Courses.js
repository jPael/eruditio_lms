import React, { useEffect, useState } from "react";

import CourseIcon from "../../../assets/images/CS315/courseLogo.png";
import Card from "./card/Card.js";
import "./courses.css";

import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData, getStudentData, getTeacherData } from "../../../../slices/user";

function Courses() {
	const userID = useSelector((state) => state.auth.user.school_id);
	const userRole = useSelector((state) => state.auth.user.role);
	// const currentUser = useSelector((state) => state.user);

	const [data, setData] = useState({});
	const [courseDatas, setCourseDatas] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (userRole === 1) {
			dispatch(getTeacherData(userID))
				.then(unwrapResult)
				.then((result) => {
					// console.log(result);
					setData(result);
				});
		} else if (userRole === 2) {
			dispatch(getStudentData(userID))
				.then(unwrapResult)
				.then((result) => {
					// console.log(result);
					setData(result);
				});
		}
	}, [dispatch, userID]);

	useEffect(() => {
		const courseData = [];

		// console.log(data.course === undefined);
		if (data.courses !== undefined) {
			for (let i = 0; i < data.courses.length; i++) {
				dispatch(getCourseData(data.courses[i]))
					.then(unwrapResult)
					.then((result) => {
						// console.log(result);
						courseData.push(result);
						setCourseDatas(filterData(courseData));
					});
			}
		}
	}, [dispatch, data, data.courses]);
	return (
		<>
			<div className="courses-container">
				{courseDatas.map((course) => {
					return (
						<Card
							key={course.code}
							data={{
								course_ID: course.course_ID,
								course_icon: CourseIcon,
								course_name: course.course_name,
								course_schedule: course.course_schedule,
								course_instructor: course.course_instructor,
								tasks: course.tasks,
								userRole,
							}}
						/>
					);
				})}
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

export default Courses;

/* <Card
	data={{
		course_ID: "CS315",
		course_icon: CourseIcon,
		course_name: "Application Development",
		course_schedule: "Monday | 2:30 - 4:00 PM",
		course_instructor: "Cherly Sardovia",
		tasks: {
			missing: [
				{
					task_schedule: "Due on Nov 1",
					task: ["Procrastination"],
				},
			],
			upcoming: [
				{
					task_schedule: "Due tomorrow",
					task: ["Final Project"],
				},
				{
					task_schedule: "Due on Dec 13",
					task: ["Procrastination", "Lorem Ipsum"],
				},
			],
		},
	}}
/> */
