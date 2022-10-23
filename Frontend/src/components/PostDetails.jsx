// @ts-nocheck
import React, { useState } from "react";
import { createPost } from "../service/post.route";

export default function PostDetails() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [postDetails, setPostDetails] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    for (const key in postDetails) {
      formData.append(key, postDetails[key]);
    }

    console.log("postDetails: ", postDetails);

    const response = await createPost(formData);

    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: "/api/upload/file",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="PostDetails">
      <form onSubmit={handleSubmit} method="POST" className="space-y-5">
        <div className="form-group">
          <label htmlFor="email" className=" mx-10 ">
            Email
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
          <label htmlFor="title" className=" mx-10 ">
            Title
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
          <label htmlFor="description" className=" mx-10 ">
            Description
          </label>
          <textarea
            className="b-2 border-gray-300 rounded-lg w-full p-2 bg-gray-100"
            id="description"
            rows="3"
            placeholder="Enter description"
            onChange={(e) =>
              setPostDetails({ ...postDetails, content: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description" className=" mx-10 ">
            summary
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
          <label htmlFor="tags" className=" mx-10 ">
            Tags
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
          <label htmlFor="image" className=" mx-10 ">
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
          <label htmlFor="tags" className=" mx-10 ">
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
          <label htmlFor="tags" className=" mx-10 ">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
