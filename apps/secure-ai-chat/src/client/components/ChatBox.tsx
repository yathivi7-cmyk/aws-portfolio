import React, { useState } from 'react';

/**
 * ChatBox component sends user messages to the server via SSE and
 * displays streaming responses.  Each message triggers a new
 * EventSource connection.
 */
const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Append the user's message to the log
    setMessages((prev) => [...prev, `You: ${trimmed}`]);

    // Open an SSE connection for the AI response
    const source = new EventSource(
      `http://localhost:3001/api/chat/stream?message=${encodeURIComponent(trimmed)}`,
    );
    source.onmessage = (ev) => {
      setMessages((prev) => [...prev, `AI: ${ev.data}`]);
    };
    source.onerror = () => {
      source.close();
    };

    setInput('');
  };

  return (
    <div>
      <div
        style={{
          border: '1px solid #ccc',
          height: '200px',
          overflowY: 'auto',
          marginBottom: '0.5rem',
          padding: '0.5rem',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;