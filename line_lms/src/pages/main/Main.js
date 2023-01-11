import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { AiOutlineClose } from "react-icons/ai";
import { Outlet } from "react-router-dom";

import { getStudentData, getTeacherData, joinCourse } from "../../slices/user";

import "./main.css";

import Menu from "./components/menu/Menu.js";
import Navbar from "./components/navbar/Navbar.js";

import UserProfile from "../assets/images/user_profile.png";

import { unwrapResult } from "@reduxjs/toolkit";
import { clearMessage } from "../../slices/message";

const Main = () => {
	// const user = useSelector((state) => state.auth);
	const userRole = useSelector((state) => state.auth.user.role);
	const userID = useSelector((state) => state.auth.user.school_id);
	// const user = useSelector((state) => state.user);

	// console.log(useSelector((state) => state.user_data));
	// console.log(user);
	// console.log(userdata);

	const [user, setUser] = useState({});
	const [menuOpen, setMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [userProfileOpen, setUserProfileOpen] = useState(false);
	const [joinCourseErrorOpen, setJoinCourseErrorOpen] = useState(false);
	// const [courses, setCourses] = useState([]);
	//get courses from the server through an api call using useEffect and store it in the redux store

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage()); // clear message when changing location
	}, [dispatch]);

	useEffect(() => {
		// console.log("main: ", userID);
		if (userRole === 1) {
			dispatch(getTeacherData(userID))
				.then(unwrapResult)
				.then((result) => {
					// console.log(resultp);
					setUser(result);
				});
		}
		if (userRole === 2) {
			dispatch(getStudentData(userID))
				.then(unwrapResult)
				.then((result) => {
					// console.log(resultp);
					setUser(result);
				});
		}
	}, [dispatch, userID, userRole]);

	// useEffect(() => {
	// 	dispatch(getCourses(user.school_id))
	// 		.then(unwrapResult)
	// 		.then((result) => {
	// 			setCourses(result);
	// 		});
	// }, [dispatch, user.school_id]);

	const toggleUserProfile = () => {
		setUserProfileOpen(!userProfileOpen);
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const toggleAll = () => {
		if (userProfileOpen) toggleUserProfile();
		if (menuOpen) toggleMenu();
	};

	// if (!user) return <Navigate to="/user/signin" />;
	// useEffect(() => {
	// 	// 	// check if the user is logged in else redirect to login page
	// 	// 	console.log(user);
	// 	if (!user) return <Navigate to="/user/signin" />;
	// 	console.log("user", user);
	// 	console.log(!user);
	// }, []);

	const joinCourseInitialValues = { joinCourseCode: "" };

	const joinCourseValidationSchema = Yup.object().shape({
		joinCourseCode: Yup.string().required("This field is required!"),
	});

	const handleJoinCourse = (formValue, onSubmitProps) => {
		const { joinCourseCode } = formValue;
		dispatch(joinCourse({ course_id: joinCourseCode, student_id: userID }))
			.unwrap()
			.then(() => {
				setModalOpen(false);
				onSubmitProps.resetForm();
				window.location.reload();
			})
			.catch(() => {
				setJoinCourseErrorOpen(true);
			});
	};

	return (
		// <span>beans</span>
		<>
			<div className="student">
				<Menu menuOpen={menuOpen} user={user} />
				<div className="body">
					<div>
						<Navbar
							menuOpen={menuOpen}
							toggleModal={toggleModal}
							toggleAll={toggleAll}
							toggleMenu={toggleMenu}
							toggleUserProfile={toggleUserProfile}
							userProfileOpen={userProfileOpen}
							user={user}
							role={userRole}
						/>
					</div>

					<div className="content" onClick={toggleAll}>
						<Outlet />
					</div>
				</div>
			</div>
			<div className={`modal-container ${modalOpen ? "modal-show" : "modal-hide"}`}>
				<div className="add-course-modal">
					<div className="modal-header">
						<div className="modal-close-button-container">
							<div onClick={toggleModal} className="modal-close-button">
								<AiOutlineClose />
							</div>
							Join class
						</div>
					</div>
					<div className="modal-body">
						<div className="modal-user-info">
							<img src={UserProfile} className="user-profile-img" alt="" />
							<span className="modal-username">Join as {`${user.firstname} ${user.lastname}`}</span>
						</div>

						<div className="course-code-input">
							<Formik
								initialValues={joinCourseInitialValues}
								validationSchema={joinCourseValidationSchema}
								onSubmit={handleJoinCourse}
							>
								<Form>
									<div className="form-group">
										<Field
											type="text"
											name="joinCourseCode"
											className="primary-input"
											placeholder="Enter course code"
										/>
										<ErrorMessage
											name="joinCourseCode"
											component="div"
											className="alert alert-danger"
										/>
									</div>
									<button type="submit" className="primary-submit" value="Add">
										Join
									</button>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
