import React, { useState } from 'react';
import './LiveChat.css';

const LiveChat = ({ selectedPool }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { pool: selectedPool, text: input }]);
      setInput('');
    }
  };

  return (
    <div className="live-chat">
      <h2>{selectedPool ? `Chat - ${selectedPool}` : 'Select a Pool to Start Chatting'}</h2>
      <div className="messages">
        {messages
          .filter((msg) => msg.pool === selectedPool)
          .map((msg, index) => (
            <p key={index}>{msg.text}</p>
          ))}
      </div>
      {selectedPool && (
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default LiveChat;
