import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/posts/allposts")
      // const response = await axios.get("http://localhost:8080/api/posts/allposts", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
  
      console.log("Response Data:", response.data); // Log the response
      console.log("Response Status:", response.status); // Log status code
  
      setPosts(response.data);
    } catch (err) {
      setError("Failed to load posts. Please refresh or try again later.");
      console.error("Error fetching posts:", err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top
  };

  return (
    <div className="feed-container p-4 max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
      <h2 className="text-xl font-semibold mt-6 mb-4">Feed</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts to display yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-lg shadow-md">
              <p className="font-medium">{post.content}</p>
              <p className="text-sm text-gray-500">
                Posted by {post.user?.name || "Unknown"} on{" "}
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown date"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feed;
