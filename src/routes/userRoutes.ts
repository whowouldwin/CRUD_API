import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers } from '../controllers/userControllers.js';
import { sendResponse } from '../utils/responseHelper.js';

export const handleUserRoutes = (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'GET' && request.url === '/api/users') {
    return getAllUsers(response);
  } else {
    sendResponse(response, 404, { message: 'Not found.' });
  }
}