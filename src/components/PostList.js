import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/users/posts", {
          params: { userId },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading posts...</div>;
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
          <p>No posts found.</p>
        )}
      </ul>
    </div>
  );
};

export default PostList;
