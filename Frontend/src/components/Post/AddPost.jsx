// @ts-nocheck
import React, { useState, useRef } from "react";
import { createPost } from "../../service/post.route";
import "./AddPost.css";
import JoditEditor from "jodit-react";
import { Card, CardBody, Form } from "reactstrap";

export default function AddPost() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [postDetails, setPostDetails] = useState({});
  const [description, setDescription] = useState("");

  const editor = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    for (const key in postDetails) {
      formData.append(key, postDetails[key]);
      console.log("postDetails", key, postDetails[key]);
    }

    formData.append("content", description);

    const response = await createPost(formData);
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
        <div className="form-group">
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
        </div>
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
          <JoditEditor editor={editor} />
        </div>
        {/* ------------------------------ */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
