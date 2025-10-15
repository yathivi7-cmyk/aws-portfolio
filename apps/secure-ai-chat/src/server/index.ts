import express from 'express';
import cors from 'cors';
import { isAllowedMessage } from './guardrails';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

/**
 * SSE endpoint.  Accepts a message query parameter, checks it against
 * guardrails and streams back a simulated AI response.  Real
 * integrations with Bedrock or OpenAI should replace the static
 * responses with streaming API calls.
 */
app.get('/api/chat/stream', (req, res) => {
  const message = Array.isArray(req.query.message)
    ? req.query.message.join(' ')
    : (req.query.message as string | undefined);
  if (!message) {
    res.status(400).send('Missing message query parameter');
    return;
  }
  // Check the guardrails
  if (!isAllowedMessage(message)) {
    res.writeHead(200, { 'Content-Type': 'text/event-stream' });
    res.write(`data: Your message contains prohibited content.\n\n`);
    res.end();
    return;
  }
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  // Simulated streaming responses
  const responses = [
    `You said: ${message}`,
    'This is a secure AI chat response.',
    'Thank you for using our service.',
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i < responses.length) {
      res.write(`data: ${responses[i]}\n\n`);
      i++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 1000);
});

app.listen(port, () => {
  console.log(`Secure AI Chat API listening on port ${port}`);
});