import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        console.error("No token found. User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/users/posts/posts", {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        setPosts(response.data); // Store posts in state
        setLoading(false); // Set loading to false after the posts are fetched
      } catch (err) {
        console.error("Failed to fetch posts", err); // Log error if request fails
        setLoading(false);
      }
    };

    fetchPosts(); // Call the function to fetch posts on component mount
  }, [userId]);

  if (loading) {
    return <div>Loading posts...</div>; // Show loading state while fetching posts
  }

  return (
    <div>
      <h2>Your Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.postId}>
              <p>{post.content}</p>
              <small>{post.timestamp}</small>
            </li>
          ))
        ) : (
          <p>No posts found.</p> // Show message if no posts exist
        )}
      </ul>
    </div>
  );
};

export default PostList;
