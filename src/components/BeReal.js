import React, { useState } from 'react';
import './BeReal.css';

const BeReal = ({ selectedPool }) => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  const postMoment = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setPosts([...posts, { pool: selectedPool, text: input }]);
      setInput('');
    }
  };

  return (
    <div className="be-real">
      <h2>{selectedPool ? `BeReal Moments - ${selectedPool}` : 'Select a Pool to Share Moments'}</h2>
      <div className="moments">
        {posts
          .filter((post) => post.pool === selectedPool)
          .map((post, index) => (
            <p key={index}>{post.text}</p>
          ))}
      </div>
      {selectedPool && (
        <form onSubmit={postMoment}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your moment..."
          />
          <button type="submit">Post</button>
        </form>
      )}
    </div>
  );
};

export default BeReal;
