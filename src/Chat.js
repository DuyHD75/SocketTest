import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat({ username }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8765/order-service/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe('/chat/receive/e7687219-9668-abe9-b5b8-15e5c2c662da', (msg) => {
          if (msg.body) {
            setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
          }
        });

        client.publish({
          destination: '/chat/send/addUser',
          body: JSON.stringify({ sender: username, type: 'JOIN' }),
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [username]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (stompClient && message.trim()) {
      const chatMessage = {
        sender: username,
        content: message,
        type: 'CHAT',
      };
      stompClient.publish({
        destination: '/chat/send/e7687219-9668-abe9-b5b8-15e5c2c662da',
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    }
  };

  return (
    <div id="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Spring WebSocket Chat Demo</h2>
        </div>
        <div className="connecting">Connecting...</div>
        <ul id="messageArea">
          {messages.map((msg, index) => (
            <li key={index}>{msg.sender}: {msg.content}</li>
          ))}
        </ul>
        <form id="messageForm" onSubmit={sendMessage}>
          <div className="form-group">
            <input
              type="text"
              id="message"
              placeholder="Type a message..."
              autoComplete="off"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="accent">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;