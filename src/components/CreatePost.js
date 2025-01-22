import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ userId, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState("text");
  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      content,
      mediaType,
      mediaUrl,
      userId,
    };

    try {
      const response = await axios.post("/api/users/posts", newPost, {
        params: { userId },
      });
      onPostCreated(response.data);  // Update parent component with new post
      setContent("");  // Reset the form fields
      setMediaType("text");
      setMediaUrl("");
    } catch (err) {
      setError("Failed to create post.");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Media Type:</label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="voice">Voice</option>
          </select>
        </div>
        {mediaType !== "text" && (
          <div>
            <label>Media URL:</label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              required={mediaType !== "text"}
            />
          </div>
        )}
        <button type="submit">Create Post</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreatePost;
