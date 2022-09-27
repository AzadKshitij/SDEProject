import { useState } from "react";
import "./Editorbox.css";
import Details from "./Details";
import { Tiptap } from "./TipTap";

function Editorbox() {
	const [description, setDescription] = useState("");

	return (
		<div className="Editorbox">
			<Tiptap setDescription={setDescription} />
			<Details description={description} />
		</div>
	);
}

export default Editorbox;
