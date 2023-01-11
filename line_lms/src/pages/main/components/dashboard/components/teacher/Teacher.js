import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData, getTeacherData } from "../../../../../../slices/user.js";

import Item from "./component/item/Item.js";

import "./teacher.css";
function Teacher(user) {
	const userID = useSelector((state) => state.auth.user.school_id);
	const [userData, setUserData] = useState({});
	const [courseDatas, setCourseDatas] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTeacherData(userID))
			.then(unwrapResult)
			.then((result) => {
				setUserData(result);
			});
	}, [dispatch, userID]);

	useEffect(() => {
		const courseData = [];

		// console.log(data.course === undefined);
		if (userData.courses !== undefined) {
			for (let i = 0; i < userData.courses.length; i++) {
				dispatch(getCourseData(userData.courses[i]))
					.then(unwrapResult)
					.then((result) => {
						courseData.push(result);
						setCourseDatas(filterData(courseData));
					});
			}
		}
	}, [dispatch, userData, userData.courses]);

	return (
		<>
			<div className="greeting-container">
				<span>Hello,</span>
				<span className="greeting-username">{`${user.user.firstname} ${user.user.lastname}`}</span>
			</div>

			<span className="label">Courses</span>
			<div className="teacher-courses-container">
				{courseDatas.length > 0 ? (
					courseDatas.map((course) => {
						return <Item course={course} />;
					})
				) : (
					<div className="no-courses">No courses</div>
				)}
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

export default Teacher;
