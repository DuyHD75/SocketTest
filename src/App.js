import React, { useState } from 'react';
import UsernameForm from './UsernameForm';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div className="App">
      {!username ? (
        <UsernameForm setUsername={setUsername} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;