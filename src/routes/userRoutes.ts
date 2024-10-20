import { IncomingMessage, ServerResponse } from 'node:http';
import { deleteUser, getAllUsers } from '../controllers/userControllers.ts';
import { sendResponse } from '../utils/responseHelper.ts';
import { parse } from 'url';
import { getUserById } from '../controllers/userControllers.ts';
import { createUser } from '../controllers/userControllers.ts';
import { updateUser } from '../controllers/userControllers.ts';

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

  } else if (request.method === 'DELETE' && pathParts?.length === 3 && pathParts[1] === 'users') {
    const userId = pathParts[2];
    return deleteUser(userId,response);

  } else {
    sendResponse(response, 404, { message: 'Not found.' });
  }
}