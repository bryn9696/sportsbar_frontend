import React, { useState } from "react";
import axios from "axios";

function PostForm({ addPost }) {
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');

  // Example of storing the Auth0 token
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
        setError("You need to be logged in to submit a post.");
        return;
    }

    try {
        const postData = { /* your post data */ };

        // Make the POST request with token in Authorization header
        const response = await axios.post(
            "http://localhost:8080/api/posts",  // your post submission endpoint
            postData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Add the token here
                },
            }
        );
        console.log(token);
        console.log("Post submitted successfully", response.data);
        // Handle successful submission (e.g., reset form, show success message)
    } catch (err) {
        console.log(token);
        console.error("Error submitting post:", err);
        setError("Error submitting post. Please try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write about live sports..."
        required
        maxLength={200}
      />
      <input
        type="text"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        placeholder="Sport (e.g., football, basketball)"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
