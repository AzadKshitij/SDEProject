// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createPost } from "../../service/post.route";
import "./AddPost.css";
import JoditEditor from "jodit-react";
// import { Card, CardBody, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function AddPost() {
	const navigate = useNavigate();
	const [b, setb] = useState(false);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [postDetails, setPostDetails] = useState({});
	const [description, setDescription] = useState("");

	const editor = useRef(null);
	// eslint-disable-next-line
	useEffect(() => {
		//eslint-disable-next-line
		setPostDetails({ ...postDetails, email: localStorage.getItem("email") });
		// eslint-disable-next-line
	}, []);

	const getHTML = (e) => {
		setDescription(e);
	};

	const handleSubmit = async (event) => {
		setb(true);
		event.preventDefault();
		const formData = new FormData();
		formData.append("image", selectedFile);
		for (const key in postDetails) {
			formData.append(key, postDetails[key]);
			console.log("postDetails", key, postDetails[key]);
		}
		formData.append("content", description);
		// eslint-disable-next-line
		const response = await createPost(formData);
		navigate("/");
	};

	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	return (
		<div className="">
			<form
				onSubmit={handleSubmit}
				method="POST"
				className="space-y-5 w-2/3 content-center flex flex-col mx-auto"
			>
				{/* <div className="form-group">
          <label htmlFor="email" className=" mr-10">
            Email*
          </label>
          <input
            type="text"
            className="b-2 border-gray-300 rounded-lg w-1/2 p-2 bg-gray-100"
            id="email"
            placeholder="Enter email"
            onChange={(e) =>
              setPostDetails({ ...postDetails, email: e.target.value })
            }
          />
        </div> */}
				<div className="form-group">
					<label htmlFor="title" className=" mr-10">
						Title*
					</label>
					<input
						type="text"
						className="b-2 border-gray-300 rounded-lg w-1/2 p-2 bg-gray-100"
						id="title"
						placeholder="Enter title"
						onChange={(e) =>
							setPostDetails({ ...postDetails, title: e.target.value })
						}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description" className=" mr-10">
						Summary*
					</label>
					<textarea
						className="b-2 border-gray-300 rounded-lg w-full p-2 bg-gray-100"
						id="summary"
						rows="3"
						placeholder="Enter summary"
						onChange={(e) =>
							setPostDetails({ ...postDetails, summary: e.target.value })
						}
					></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="tags" className=" mr-10">
						Tags*
					</label>
					<input
						type="text"
						className="b-2 border-gray-300 rounded-lg w-1/2 p-2 bg-gray-100"
						id="tags"
						placeholder="Enter tags"
						onChange={(e) =>
							setPostDetails({ ...postDetails, tags: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="image" className=" mr-10">
						Image
					</label>
					<input
						type="file"
						className="form-control-file"
						id="image"
						onChange={handleFileSelect}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="tags" className=" mr-10">
						Alt
					</label>
					<input
						type="text"
						className="b-2 border-gray-300 rounded-lg w-1/2 p-2 bg-gray-100"
						id="tags"
						placeholder="Enter Alt"
						onChange={(e) =>
							setPostDetails({ ...postDetails, alt: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="tags" className=" mr-10">
						original
					</label>
					<input
						type="text"
						className="b-2 border-gray-300 rounded-lg w-1/2 p-2 bg-gray-100"
						id="tags"
						placeholder="Enter original image url(if exist)"
						onChange={(e) =>
							setPostDetails({ ...postDetails, original: e.target.value })
						}
					/>
				</div>
				{/* ------------------------------ */}
				<div className="textEditor">
					<JoditEditor
						ref={editor}
						editor={editor}
						// onChange={(e) => getHTML(e)}
						onBlur={(e) => getHTML(e)}
					/>
				</div>
				{/* ------------------------------ */}

				<Button
					type="submit"
					className="btn btn-primary pb-5"
					variant="contained"
					disabled={b}
				>
					Submit
				</Button>
			</form>
		</div>
	);
}
