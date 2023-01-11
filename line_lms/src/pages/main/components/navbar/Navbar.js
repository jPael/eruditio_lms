import React, { useEffect, useState } from "react";

import logo from "../../../assets/images/logo.png";
import userProfile from "../../../assets/images/user_profile.png";

import "./navbar.css";

import { FaBars } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../../../slices/message";
import { logout } from "../../../../slices/auth";

const Navbar = ({
	menuOpen,
	toggleModal,
	toggleUserProfile,
	userProfileOpen,
	toggleAll,
	toggleMenu,
	user,
	role,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage());
	});

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="navbar" onClick={toggleAll}>
			<div className={`hamburger-button ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
				<FaBars />
			</div>
			<Link to={"/main"}>
				<div className="menu-header">
					<div className="logo">
						<span className="logo-yorange">E</span>
						<span className="logo-orange">R</span>
						<span className="logo-yorange">U</span>
						<span className="logo-orange">D</span>
						<span className="logo-yorange">I</span>
						<span className="logo-orange">T</span>
						<span className="logo-yorange">I</span>
						<span className="logo-orange">O</span>
					</div>
					{/* <img src={logo} alt="lineLMS logo" /> */}
					{/* <span>line LMS</span> */}
				</div>
			</Link>
			<div className="course-add" onClick={toggleModal}>
				<IoMdAddCircleOutline />
			</div>
			<div className="user-profile" onClick={toggleUserProfile}>
				<img src={userProfile} className="user-profile-img" alt="" />

				<div
					className={`profile-menu ${userProfileOpen ? "profile-menu-show" : "profile-menu-hide"}`}
				>
					<div className="profile-menu-header">
						<img src={userProfile} className="user-profile-img" alt="" />
						<div className="profile-menu-header-info">
							<span className="profile-menu-header-username">{`${user.firstname} ${user.lastname}`}</span>
							<span className="profile-menu-header-id">{user.id}</span>
						</div>
					</div>
					<div className="profile-menu-options">
						<div className="profile-menu-option">
							<Link to={`./profile/${user.id}`}>
								<span>Profile</span>
							</Link>
						</div>
						{/* <div className="profile-menu-option">
							<span>Settings</span>
						</div> */}

						{role === 1 ? (
							<Link to={"./createcourse"}>
								<div className="profile-menu-option">
									<span>Create course</span>
								</div>
							</Link>
						) : null}

						<div onClick={handleLogout} className="profile-menu-option">
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
