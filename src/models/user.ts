import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ServerResponse } from 'node:http';
import { sendResponse } from '../utils/responseHelper.js';

export interface User {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}

export const users: User[] = [
  {
    id: uuidv4(),
    username: 'Max',
    age: 30,
    hobbies: ['painting', 'reading']
  },
  {
    id: uuidv4(),
    username: 'Kate',
    age: 32,
    hobbies: ['painting']
  },
]

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
