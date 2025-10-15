# Secure AI Chat

`secure-ai-chat` is a full‑stack demo application that showcases how
to build a React chat interface backed by an Express server which
streams responses from a language model.  The backend includes
primitive **AI guardrails** to moderate user input by filtering
undesirable content before invoking the model.  The frontend uses
Server‑Sent Events (SSE) to display streaming responses in real time.

## Getting Started

Install dependencies for both the client and server:

```bash
pnpm install
```

### Running the Server

To start the Express API server in development mode:

```bash
pnpm --filter secure-ai-chat run dev:server
```

The server listens on port **3001** by default and exposes a single
endpoint at `/api/chat/stream`.  Messages are passed as a query
parameter and the endpoint returns an SSE stream of AI responses.

### Running the Client

Start the Vite development server for the React client:

```bash
pnpm --filter secure-ai-chat run dev:client
```

The client runs on port **3002**.  Open <http://localhost:3002> in
your browser to interact with the chat interface.  Messages typed
into the input box are sent to the server, which then streams
responses back using SSE.

## Building for Production

To build the client and server for production deployment:

```bash
pnpm --filter secure-ai-chat run build:client
pnpm --filter secure-ai-chat run build:server
```

The compiled server code is emitted into the `dist/` directory.  You
can run it with `node dist/server/index.js`.  The client build is
output into `dist/client/`.

## Testing

This project uses Vitest for unit testing.  A simple test for the
guardrail function is included in `test/guardrails.test.ts`.  Run
tests with:

```bash
pnpm --filter secure-ai-chat run test
```
