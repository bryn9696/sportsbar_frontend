import React, { useState } from 'react';

function PostForm({ addPost }) {
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      content,
      sport,
      timestamp: new Date().toISOString(),
    };

    addPost(newPost);

    // Clear the form fields
    setContent('');
    setSport('');
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
