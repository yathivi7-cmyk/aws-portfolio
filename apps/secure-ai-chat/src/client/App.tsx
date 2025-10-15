import React from 'react';
import ChatBox from './components/ChatBox';

/**
 * Top‑level React component for the secure AI chat demo.  Renders a
 * title and the chat box.
 */
const App: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Secure AI Chat</h1>
      <p>Type a message to chat with the AI.  Unsafe content will be blocked.</p>
      <ChatBox />
    </div>
  );
};

export default App;