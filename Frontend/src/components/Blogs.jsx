import React from "react";
import BlogCard from "./BlogCard";
function Blogs() {
	return (
		<div className="container mx-auto bg-bg px-10">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12  ">
				<div className=" col-span-1 lg:col-span-8 ">
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
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
