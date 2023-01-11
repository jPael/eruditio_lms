import React from "react";
import { Outlet } from "react-router-dom";

import "./user.css";
import logo from "../assets/images/logo.png";

const User = () => {
	return (
		<div className="user">
			<div className="card">
				<Outlet />
			</div>
		</div>
	);
};

export default User;
