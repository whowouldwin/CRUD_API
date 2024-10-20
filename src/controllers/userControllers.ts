import { User } from '../models/user.js';
import { sendResponse } from '../utils/responseHelper.js';
import { ServerResponse } from 'node:http';
import { users } from '../models/user.js';

export const getAllUsers = async (response: ServerResponse) => {
  sendResponse(response, 200, users)
}
