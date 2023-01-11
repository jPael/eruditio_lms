import React, { useEffect, useState } from "react";

import "./user-profile.css";

import userProfile from "../../../assets/images/user_profile.png";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getStudentData, getTeacherData } from "../../../../slices/user";
// import userProfile from "../../../../assets/images/logo.svg";

function UserProfile() {
	//get the user state
	// const user = useSelector((state) => state.user);
	const userID = useSelector((state) => state.auth.user.school_id);
	const userRole = useSelector((state) => state.auth.user.role);
	const [data, setData] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		if (userRole === 1) {
			dispatch(getTeacherData(userID))
				.then(unwrapResult)
				.then((result) => {
					setData(result);
				});
		} else if (userRole === 2) {
			dispatch(getStudentData(userID))
				.then(unwrapResult)
				.then((result) => {
					setData(result);
				});
		}
	}, [dispatch, userID, userRole]);

	return (
		<div className="userProfile-container">
			<div className="userProfile-header">
				<div className="userProfile-hero">User Profile</div>
				<div className="userProfile-picture">
					<img src={userProfile} alt="" className="user-profile-img" />
					<div className="userProfile-changeButton">Replace</div>
				</div>
				<button className="userProfile-changeProfile-button"></button>
			</div>
			<div className="userProfile-body">
				<div className="input-row">
					<div className="input">
						<label htmlFor="ID">ID</label>
						<input type="text" id="ID" value={data.id} />
					</div>
				</div>
				<div className="input-row">
					<div className="input">
						<label htmlFor="firstname">Firstname</label>
						<input type="text" id="firstname" value={data.firstname} />
					</div>
					<div className="input">
						<label htmlFor="lastname">Lastname</label>
						<input type="text" id="lastname" value={data.lastname} />
					</div>
				</div>
				<div className="input-row">
					<div className="input">
						<label htmlFor="email">Email</label>
						<input type="text" id="email" value={data.email} />
					</div>
				</div>
				{/* <div className="input-row">
					<div className="input">
						<label htmlFor="contact">Contact number</label>
						<input type="text" value={user.contact} />
					</div>
				</div> */}
				<div className="input-row">
					<div className="input">
						<button className="primary-submit">Update</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
