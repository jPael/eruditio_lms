import React, { useEffect, useRef, useState } from "react";

import formatDistance from "date-fns/formatDistance";
import { AiOutlineUpload } from "react-icons/ai";
import { IoMdLink } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getTaskData, uploadFiles } from "../../../../slices/user";

import "./task.css";

import { unwrapResult } from "@reduxjs/toolkit";
import { format } from "date-fns";

import Item from "./components/Item.js";

function Task() {
	const params = useParams();
	const dispatch = useDispatch();

	const userRole = useSelector((state) => state.auth.user.role);
	const school_id = useSelector((state) => state.auth.user.school_id);

	const [uploads, setUploads] = useState({ files: [], links: [] });

	const [fileProgress, setFileProgress] = useState([]);
	const [linkProgress, setLinkProgress] = useState([]);

	const [preventRemove, setPreventRemove] = useState(false);

	const [canSubmit, setCanSubmit] = useState(false);

	const [file, setFile] = useState(null);

	const [task, setTask] = useState({});

	useEffect(() => {
		dispatch(getTaskData({ task: params.taskID }))
			.then(unwrapResult)
			.then((result) => {
				setTask(result);
			});
	}, [dispatch, params]);

	const [openUpload, setOpenUpload] = React.useState(false);
	const [openLink, setOpenLink] = React.useState(false);

	const modalUploadToggle = () => {
		setOpenUpload(!openUpload);
		if (openLink) {
			setOpenLink(false);
		}
	};
	const modalLinkToggle = () => {
		setOpenLink(!openLink);
		if (openUpload) {
			setOpenUpload(false);
		}
	};

	const modalToggleAll = () => {
		if (openUpload) setOpenUpload(false);
		if (openLink) setOpenLink(false);
	};

	const enableSubmit = () => {
		if (uploads.files.length > 0 || uploads.links.length > 0) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	};

	const handleUpload = async (e) => {
		setPreventRemove(true);

		if (uploads.files.length > 0) {
			for (let i = 0; i < uploads.files.length; i++) {
				// const file = await uploads.files.splice(i, 1)[0];
				const file = uploads.files[i];

				await dispatch(
					uploadFiles({
						user_id: school_id,
						task_id: params.taskID,
						data: file,
						type: "file",
						index: i,
						setFileProgress,
						setLinkProgress,
					})
				).then((res) => {
					console.log(i, res);
				});
			}
		}

		if (uploads.links.length > 0) {
			for (let i = 0; i < uploads.links.length; i++) {
				// const link = await uploads.links.splice(i, 1)[0];
				const link = uploads.links[i];

				await dispatch(
					uploadFiles({
						user_id: school_id,
						task_id: params.taskID,
						data: link,
						type: "link",
						index: i,
						setFileProgress,
						setLinkProgress,
					})
				).then((res) => {});
			}
		}

		setPreventRemove(false);
	};

	// console.log(progress);
	// useEffect(() => {
	// 	console.log(progress);
	// }, [progress]);

	const handleOnchangeUpload = (e) => {
		const _uploads = uploads;

		// console.log(e.target.type);
		// console.log(e.target.type === "file");

		if (e.target.type === "file") {
			const value = e.target.files[0];
			const file_name = value.name;
			const extension_index = file_name.split(".").length - 1;
			const file_extension = file_name.split(".")[extension_index].toLowerCase();

			if (!isvalidFile(file_extension)) {
				alert("Invalid file type!");
				e.target.value = "";
				return;
			}

			_uploads.files.push(value);
			setFileProgress((progress) => [...progress, 0]);

			e.target.value = "";
		} else if (e.target.type === "submit") {
			const value = e.target.previousSibling.value;

			if (!isValidURL(value)) {
				alert("Please enter a valid URL!");
				e.target.value = "";
				return;
			}

			_uploads.links.push(value);
			setLinkProgress((progress) => [...progress, 0]);
			e.target.value = "";
		}
		setUploads((uploads) => ({ ...uploads, ..._uploads }));
		enableSubmit();
	};

	// useEffect(() => {
	// 	console.log(progress);
	// }, [progress]);

	return (
		<div className="main-task">
			<div className="task-header">
				<div className="task-title-sched-wrapper">
					<div className="task-title">{task.task}</div>
					<div className="task-sched">{getDueDate(task.task_schedule)}</div>
				</div>
				{userRole === 2 && (
					<button
						className={`task-submit ${canSubmit ? null : "bg-dark"}`}
						onClick={handleUpload}
						disabled={!canSubmit}
					>
						Submit
					</button>
				)}
			</div>
			<div className="task-description">
				<p>{task.task_description}</p>
			</div>
			{userRole === 2 ? (
				<>
					<div className="task-attachment-wrapper">
						<Item
							uploads={uploads}
							setUploads={setUploads}
							fileProgress={fileProgress}
							linkProgress={linkProgress}
							setFileProgress={setFileProgress}
							setLinkProgress={setLinkProgress}
						/>
					</div>
					<div className="task-action-wrapper">
						<button
							className="btn btn-outline-primary fs-4 fw-semibold "
							onClick={modalUploadToggle}
						>
							<span className="fs-4 px-2">
								<AiOutlineUpload />
							</span>
							Upload
						</button>

						<button className="btn btn-outline-primary fs-4 fw-semibold" onClick={modalLinkToggle}>
							<span className="fs-4 px-2">
								<IoMdLink />
							</span>
							Insert link
						</button>
					</div>
					<div
						className={`task-upload-modal ${
							openUpload ? "task-upload-modal-show" : "task-upload-modal-hide"
						}`}
					>
						<div className="task-upload-modal-header-wrapper">
							<span>Upload files</span>
						</div>

						<div className="input-group " onChange={handleOnchangeUpload}>
							<input type="file" name="file" className="form-control fs-3" />
						</div>
					</div>
					<div
						className={`task-insert-link-modal ${
							openLink ? "task-insert-link-modal-show" : "task-insert-link-modal-hide"
						}`}
					>
						<div className="task-upload-modal-header-wrapper">
							<span>Insert Link</span>
						</div>
						<div className="input-group ">
							<input
								type="text"
								name="link"
								className="form-control fs-3"
								placeholder="Insert link here"
							/>
							<button
								className="input-group-text fs-3 btn btn-primary"
								onClick={handleOnchangeUpload}
							>
								Insert link
							</button>
						</div>
					</div>
				</>
			) : userRole === 1 ? (
				<div className="task-action-wrapper">
					<Link to={`/main/submission/${params.taskID}`}>View submission</Link>
				</div>
			) : null}
		</div>
	);
}

function getDueDate(task_schedule) {
	// console.log(task_schedule, new Date(task_schedule));
	if (task_schedule)
		return (
			"Due " +
			formatDistance(new Date(task_schedule), new Date(), { addSuffix: true }) +
			` | ${format(new Date(task_schedule), "MM/dd/yyyy")}`
		);
}

function isValidURL(str) {
	if (
		/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
			str
		)
	) {
		return true;
	} else {
		return false;
	}
}

export default Task;

function isvalidFile(extension) {
	const validFileTypes = ["doc", "docx", "html", "htm", "pdf", "xls", "xlsx", "ppt", "pptx", "txt"];

	return validFileTypes.includes(extension);
}
