import React, { useState } from 'react';

function UsernameForm({ setUsername }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(name.trim());
  };

  return (
    <div id="username-page">
      <div className="username-page-container">
        <h1 className="title">Type your username to enter the Chatroom</h1>
        <form id="usernameForm" name="usernameForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Username"
              autoComplete="off"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="accent username-submit">
              Start Chatting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsernameForm;