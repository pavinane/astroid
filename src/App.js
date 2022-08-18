import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.scss";

import PostForm from "./Assignment1/postForm";

function App() {
  return (
    <div className="App ">
      <PostForm />
    </div>
  );
}

export default App;
