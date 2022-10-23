import React, { useState } from "react";
import "./Editorbox.css";
import Details from "./Details";
import { Tiptap } from "./TipTap";
import PostDetails from "../PostDetails";

function Editorbox() {
  const [description, setDescription] = useState("");

  return (
    <div className="Editorbox">
      <PostDetails />
      <Tiptap setDescription={setDescription} />
      <Details description={description} />
    </div>
  );
}

export default Editorbox;
