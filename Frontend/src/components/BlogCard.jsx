import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ title, summary, image, publishedAt, author, slug }) {
  const date = new Date(publishedAt);
  // console.log(date);

  return (
    <div className="mb-8 rounded-lg border-2 bg-primary p-0 pb-12 shadow-lg lg:p-8 ">
      <div className=" relative mb-6 overflow-hidden pb-80 shadow-md ">
        <img
          src={image}
          alt="blog"
          className="absolute h-80 w-full rounded-t-lg object-cover  object-top shadow-lg lg:rounded-lg"
        />
      </div>
      <h1 className="link mb-8 cursor-pointer text-ellipsis  text-center text-3xl font-semibold text-mainTitle transition  duration-700 hover:text-title">
        {title}
      </h1>

      <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
        <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
          <img
            // unoptimized
            // loader={grpahCMSImageLoader}
            alt="avatar"
            height="30px"
            width="30px"
            className="rounded-full align-middle"
            src="https://images.unsplash.com/photo-1616161611111-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          />
          <p className="ml-2 inline align-middle text-lg font-medium text-gray-900">
            {author["name"]}
          </p>
        </div>
        <div className="font-medium text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 inline h-6 w-6 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {date.toLocaleString("en-US", { month: "short" }) +
              " " +
              date.getDate() +
              " " +
              date.getFullYear()}
          </span>
        </div>
      </div>
      <p className="mb-8 px-4 text-center text-lg font-normal text-gray-800 lg:px-20">
        {summary}
      </p>
      <Link to={`/post/${slug}`} className="text-center">
        <span className="ease inline-block transform cursor-pointer rounded-full bg-background px-8 py-3 text-lg font-medium text-red transition duration-500 hover:-translate-y-1 hover:bg-mainTitle">
          Continue Reading
        </span>
      </Link>
    </div>
  );
}

export default BlogCard;
