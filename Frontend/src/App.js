// @ts-nocheck
import React from "react";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Editorbox from "./components/Editor/Editorbox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Blogs />}></Route>
          <Route exact path="/newblog" element={<Editorbox />}></Route>
        </Routes>
      </Router>

      {/* <Header />
			<Blogs /> */}
    </div>
  );
}

export default App;
