import React from "react";
import "./Header.css";

function Header() {
	return (
		<div className={`container mx-auto px-10 pb-8 bg-white `}>
			<div className="inline-block w-full border-b border-blue-400 py-8 ">
				<div className=" float-left block ">
					<span className=" cursor-pointer text-2xl font-bold  text-black md:text-4xl">
						AVIATO
					</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
