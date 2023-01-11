import React from "react";

import "./landingpage.css";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";
import LandinPageLogo from "../assets/images/landingpage-background.jpg";

const LandingPage = () => {
	const background = {
		backgroundImage: `url(${LandinPageLogo})`,
	};

	return (
		<div className="landingpage" style={background}>
			<nav>
				<div className="logo">
					<img src={logo} alt="lineLMs logo" />
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
					</div>
					{/* <span className="logo-text">line LMS</span> */}
				</div>

				<div className="nav-links">
					<Link to="/about">About us</Link>
					<Link to="/contact">Contact us</Link>
					<Link to="/user/signin" className="button">
						Login
					</Link>
				</div>
			</nav>
			<div className="main">
				<div className="content">
					<h1>Educations’ sharpest tool to shape the better future</h1>
					<h3>
						line LMS is a user friendly tool for a better education. Meeting the required standards
						for workplace and education learning.
					</h3>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
