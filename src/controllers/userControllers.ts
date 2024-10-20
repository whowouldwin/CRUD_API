import { User } from '../models/user.js';
import { sendResponse } from '../utils/responseHelper.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { users } from '../models/user.js';
import { parseRequestBody } from '../utils/bodyParser.js';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export const getAllUsers = async (response: ServerResponse) => {
  sendResponse(response, 200, users)
}

export const getUserById = async (id: string, response: ServerResponse) => {
  if (!uuidValidate(id)) {
    return sendResponse(response, 400, { message: 'Invalid UUID. Must be a valid UUID'} );
  }
  const user = users.find((u) => u.id === id);

  if(!user) {
    return sendResponse(response, 404, { message: `User with id ${id} does not exist`} );
  }
  sendResponse(response, 200, user);
}

export const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = await parseRequestBody(request);
    const { username, age, hobbies } = body;
    if (typeof username !== 'string') {
      return sendResponse(response, 400, { message: 'Invalid request. Username must be a string'} );
    }
    if (typeof age !== 'number') {
      return sendResponse(response, 400, { message: 'Invalid request. Age must be a number'} );
    }
    if (!Array.isArray(hobbies)) {
      return sendResponse(response, 400, { message: 'Invalid request. Hobbies must be an array'} );
    }
    if (hobbies.some((h) => typeof h !== 'string')) {
      return sendResponse(response, 400, { message: 'Invalid request. Each hobby must be a string'} );
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies
    };

    users.push(newUser);

    return sendResponse(response, 201, newUser)

  } catch (e) {
    return sendResponse(response, 400, { message: 'Invalid request body. Could not parse JSON file'});
  }
}
