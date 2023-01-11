import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Item({
	uploads,
	setUploads,
	fileProgress,
	linkProgress,
	setFileprogress,
	setLinkProgress,
}) {
	const { files, links } = uploads;

	const remove = (index, type) => {
		return () => {
			const _files = files;
			const _links = links;
			const _filesProgress = fileProgress;
			const _linksProgress = linkProgress;

			if (type === "file") {
				_files.splice(index, 1);
				_filesProgress.splice(index, 1);
			} else if (type === "link") {
				_links.splice(index, 1);
				_linksProgress.splice(index, 1);
			}

			const _uploads = { _files, _links };

			setUploads((uploads) => ({ ...uploads, ..._uploads }));
			setFileprogress(_filesProgress);
			setLinkProgress(_linksProgress);
		};
	};

	return (
		<>
			{files.length > 0
				? files.map((file, index) => (
						<div className="task-attachment" key={index}>
							<div className="attachment-description">
								<span className="task-attachment-name" title={file.name}>
									{file.name}
								</span>
								<div
									className="task-attachment-removebtn  button"
									title="Remove"
									onClick={
										fileProgress[index] === 100
											? remove(index, "file")
											: fileProgress[index] === 0
											? remove(index, "file")
											: null
									}
								>
									{fileProgress[index] > 0 && fileProgress[index] < 100 ? (
										<div class="spinner-border spinner-border-sm" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									) : (
										<AiOutlineClose />
									)}
								</div>
							</div>
							<div
								className="progress mt-1"
								role="progressbar"
								aria-label="25% Complete"
								aria-valuenow="25"
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ height: "5px", background: "none" }}
							>
								<div
									className={`progress-bar ${
										fileProgress[index] === 100 ? "bg-success" : "bg-primary"
									}`}
									style={{ width: `${fileProgress[index]}%`, outline: "1px solid rgb(0,0,0,.001)" }}
								></div>
							</div>
						</div>
				  ))
				: null}

			{links.length > 0
				? links.map((link, index) => (
						<div className="task-attachment" key={index}>
							<div className="attachment-description">
								<span className="task-attachment-name">{link}</span>
								<div
									className="task-attachment-removebtn  button"
									onClick={
										linkProgress[index] === 100
											? remove(index, "file")
											: linkProgress[index] === 0
											? remove(index, "file")
											: null
									}
								>
									{linkProgress[index] > 0 && linkProgress[index] < 100 ? (
										<div class="spinner-border spinner-border-sm" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									) : (
										<AiOutlineClose />
									)}
								</div>
							</div>
							<div
								className="progress mt-1"
								role="progressbar"
								aria-label="25% Complete"
								aria-valuenow="25"
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ height: "5px", background: "none" }}
							>
								<div
									className={`progress-bar ${
										linkProgress[index] === 100 ? "bg-success" : "bg-primary"
									}`}
									style={{ width: `${linkProgress[index]}%`, outline: "1px solid rgb(0,0,0,.001)" }}
								></div>
							</div>
						</div>
				  ))
				: null}
		</>
	);
}

export default Item;
