import { ServerResponse } from 'node:http';

export const sendResponse = (response: ServerResponse, statusCode: number, data: any) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
}