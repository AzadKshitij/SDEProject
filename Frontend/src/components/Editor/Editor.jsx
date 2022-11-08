import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Card, CardBody, Form } from "reactstrap";

function Editor() {
  const editor = useRef(null);
  // eslint-disable-next-line
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  return (
    <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          <h1 className="mt-1 text-lg font-semibold">Add Blog</h1>
          <Form>
            <div className="my-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter here"
                name="title"
                required
              ></input>
            </div>

            <div className="my-3">
              <label htmlFor="content">Post Content</label>
              {/* <Input
                            type="textarea"
                            id="content"
                            placeholder="Enter here"
                            className="rounded-0"
                            style={{ height: '300px' }}
                        /> */}

              <JoditEditor
                ref={editor}
                value={post.content}
                // onChange={(newContent) => contentFieldChanaged(newContent)}
              />
            </div>

            {/* file field  */}

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedrounded-0"
                color="primary"
              >
                Create Post
              </button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Editor;
