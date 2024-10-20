import { ServerResponse } from 'node:http';

export const handleServerError = (response: ServerResponse, error: Error) => {
  console.error('Server error', error.message);
  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Something went wrong. Please try again later.' }));
}