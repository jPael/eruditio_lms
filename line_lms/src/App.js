import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";

import LandingPage from "./pages/landingpage/LandingPage.js";
import User from "./pages/user/User.js";
import Signin from "./pages/user/components/signin/Signin.js";
import Signup from "./pages/user/components/signup/Signup.js";
import Main from "./pages/main/Main.js";
import Dashboard from "./pages/main/components/dashboard/Dashboard.js";
import Courses from "./pages/main/components/courses/Courses.js";
import Course from "./pages/main/components/course/Course.js";
import Task from "./pages/main/components/task/Task.js";
import UserProfile from "./pages/main/components/user-profile/UserProfile.js";
import CreateCourse from "./pages/main/components/create-course/CreateCourse.js";
import CreateTask from "./pages/main/components/create-task/CreateTask.js";
import ViewStudents from "./pages/main/components/view-students/ViewStudents.js";
import ViewSubmissions from "./pages/main/components/submission/Submission.js";

const App = () => {
	return (
		<div className="">
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/user" element={<User />}>
						<Route path="signin" element={<Signin />} />
						<Route path="signup/:type" element={<Signup />} />
					</Route>
					<Route
						path="/main"
						element={
							<RequireAuth>
								<Main />
							</RequireAuth>
						}
					>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="" element={<Dashboard />} />
						<Route path="courses" element={<Courses />} />
						<Route path="course/:courseID" element={<Course />} />
						<Route path="task/:taskID" element={<Task />} />
						<Route path="profile/:userID" element={<UserProfile />} />
						<Route path="createcourse" element={<CreateCourse />} />
						<Route path="createtask/:courseID" element={<CreateTask />} />
						<Route path="viewstudent/:courseID" element={<ViewStudents />} />
						<Route path="submission/:taskID" element={<ViewSubmissions />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

function RequireAuth({ children }) {
	const { user } = useSelector((state) => state.auth);

	return user ? children : <Navigate to="/user/signin" />;
}

export default App;
