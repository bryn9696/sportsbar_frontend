import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState(""); // If mediaType is required
  const [mediaUrl, setMediaUrl] = useState(""); // If mediaUrl is required
  const [topicIds, setTopicIds] = useState([]); // Ensure topics are sent correctly
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    // Check if token exists and log it for debugging
    console.log("Token being sent:", token);

    const postData = {
      content,
      mediaType: mediaType || "text", // Default to "text" if empty
      mediaUrl: mediaUrl || null, // Ensure mediaUrl is handled
      topicIds: topicIds.length > 0 ? topicIds : [], // Ensure topic IDs are sent properly
    };

    console.log("Post data being sent:", postData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts", // Correct URL for creating posts
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created successfully:", response.data);
      setContent(""); // Clear form after successful submission
      setMediaType("");
      setMediaUrl("");
      setTopicIds([]);
      setError(""); // Clear any previous error messages
    } catch (err) {
      console.error("Error submitting post:", err);
      setError(
        "Error submitting post: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here"
          required
        />
        <input
          type="text"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          placeholder="Media Type (optional)"
        />
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Media URL (optional)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
