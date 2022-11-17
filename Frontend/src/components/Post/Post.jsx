// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getOneData } from "../../service/post.route";
// import { Link } from "react-router-dom";
// import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import Avatar from "@mui/material/Avatar";
// import "./Post.css";

const Post = () => {
	const { slug } = useParams();
	const [post, SetPost] = useState({});

	async function getBlogPost() {
		let result = await getOneData(slug);
		console.log("result.data: ", result?.data);
		SetPost(result?.data);
		console.log("post: ", post);
	}

	const myHTML = post.content;

	React.useEffect(() => {
		getBlogPost();
		// eslint-disable-next-line
	}, []);
	// const printDate = (numbers) => {
	// 	return new Date(numbers).toLocaleDateString();
	// };

	return (
		// <div className="container mx-auto bg-bg px-2 pb-8 md:px-10">
		// 	<div className="">
		// 		<div className="col-span-1 lg:col-span-8">
		// 			<div className="mb-8 rounded-lg border-2 bg-primary pb-12 shadow-lg lg:p-8">
		// 				<div className="relative mb-6 overflow-hidden shadow-md">
		// 					<h1>Author : {post.author}</h1>
		// 				</div>
		// 				<div className="px-4 lg:px-0">
		// 					<div className="mb-8 flex w-full items-center">
		// 						<img src={post.mainImage} />
		// 					</div>
		// 					<h1 className="mb-8 text-3xl font-semibold text-mainTitle">
		// 						{post.title}
		// 					</h1>
		// 					<div
		// 						className="mb-8"
		// 						dangerouslySetInnerHTML={{ __html: myHTML }}
		// 					/>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="grid grid-cols-1 gap-12 lg:grid-cols-16 mx-56">
			<div className="mb-8 rounded-lg border-2 bg-primary p-0 pb-12 shadow-lg lg:p-16 ">
				<div className="shadow-md ">
					<img
						src={post.mainImage}
						alt="blog"
						className=" w-full rounded-t-lg object-cover  object-top shadow-lg lg:rounded-lg"
					/>
				</div>
				<h1 className="link mt-8 mb-8 cursor-pointer text-ellipsis  text-center text-3xl font-semibold text-mainTitle transition  duration-700 hover:text-title">
					{post.title}
				</h1>

				<div className="mb-8 block w-full items-center justify-center text-center lg:flex">
					<div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
						{post.author && <Avatar>{post.author[0].toUpperCase()}</Avatar>}
						<p className="ml-2 inline align-middle text-lg font-medium text-gray-900">
							{post.author}
						</p>
					</div>
					<div className="font-medium text-gray-900">
						{/* <svg
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
					</svg> */}
						{/* <span className="align-middle">
						{date.toLocaleString("en-US", { month: "short" }) +
							" " +
							date.getDate() +
							" " +
							date.getFullYear()}
					</span> */}
					</div>
				</div>
				<p className="mb-8 px-4 text-center text-lg font-normal text-gray-800 lg:px-20">
					<div className="mb-8" dangerouslySetInnerHTML={{ __html: myHTML }} />
				</p>
			</div>
		</div>
	);
};

export default Post;
