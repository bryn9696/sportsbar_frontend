import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Posts from "./components/PostList"; // A component to display posts
import CreatePost from "./components/CreatePost"; // A component to display posts
import Navbar from "./components/Navbar"; // Optional Navbar component

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar /> {/* Optional, for navigation */}
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts" element={<CreatePost />} />
                    {/* Add other routes as needed */}
                    <Route path="/" element={<h1>Welcome to SportsBar!</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
