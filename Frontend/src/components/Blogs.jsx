// @ts-nocheck
import React from "react";
import BlogCard from "./BlogCard";
import service from "../service";
import { getAllData } from "../service/post.route";

function Blogs() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    getAllData_();
  }, []);

  async function getAllData_() {
    let result = await getAllData();
    console.log("result.data: ", result.data);
    setBlogs(result.data);
    console.log("blogs: ", blogs);
    // try {
    //   const res = await service.get("/post/get");

    //   const result = {
    //     status: res.status + "-" + res.statusText,
    //     headers: res.headers,
    //     data: res.data,
    //   };

    //   setBlogs(result.data);

    //   console.log("==================================");
    //   console.log(JSON.stringify(result, null, 2));
    //   console.log("==================================");
    // } catch (err) {
    //   console.log(JSON.stringify(err, null, 2));
    // }
  }

  return (
    <div className="container mx-auto bg-bg px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12  ">
        <div className=" col-span-1 lg:col-span-8 ">
          {console.log(blogs)}
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id["$oid"]}
              title={blog.title}
              summary={blog.summary}
              image={blog.mainImage}
              publishedAt={blog.publishedAt["$date"]}
              author={blog.author}
              id={blog._id}
            />
          ))}

          {/* <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard /> */}
        </div>
        <div className=" col-span-1  lg:col-span-4 ">
          <div className=" relative top-8 lg:sticky ">
            <h1>Sandeep Swami</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
