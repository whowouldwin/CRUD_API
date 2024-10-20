import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers } from '../controllers/userControllers.js';
import { sendResponse } from '../utils/responseHelper.js';
import { parse } from 'url';
import { getUserById } from '../controllers/userControllers.js';
import { createUser } from '../controllers/userControllers.js';
import { updateUser } from '../controllers/userControllers.js';

export const handleUserRoutes = (request: IncomingMessage, response: ServerResponse) => {
  const parseURL = parse(request.url || '', true);
  const pathParts = parseURL.pathname?.split('/').filter(Boolean);

  if (request.method === 'GET' && pathParts?.length === 2 && pathParts[1] === 'users') {
    return getAllUsers(response);

  } else if (request.method === 'GET' && pathParts?.length === 3 && pathParts[1] === 'users') {
    const userId = pathParts[2];
    return getUserById(userId, response);

  } else if (request.method === 'POST' && pathParts?.length === 2 && pathParts[1] === 'users') {
    return createUser(request, response);

  } else if (request.method === 'PUT' && pathParts?.length === 3 && pathParts[1] === 'users') {
    const userId = pathParts[2];
    return updateUser(userId, request, response);

  } else {
    sendResponse(response, 404, { message: 'Not found.' });
  }
}