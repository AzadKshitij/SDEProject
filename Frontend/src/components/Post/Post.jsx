// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getOneData } from "../../service/post.route";

const Post = () => {
  const { slug } = useParams();
  const [post, SetPost] = useState({});

  async function getBlogPost() {
    let result = await getOneData(slug);
    console.log("result.data: ", result?.data);
    SetPost(result?.data);
  }

  React.useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <div>
      {slug ? (
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <br />
          <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
          <button>Go back</button>
        </article>
      ) : (
        <h1>Post</h1>
      )}
    </div>
  );
};

export default Post;
