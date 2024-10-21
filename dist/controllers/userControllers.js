import { sendResponse } from '../utils/responseHelper.js';
import { users } from '../models/user.js';
import { parseRequestBody } from '../utils/bodyParser.js';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { handleServerError } from '../utils/errorHandler.js';
export const getAllUsers = async (response) => {
    try {
        sendResponse(response, 200, users);
    }
    catch (error) {
        handleServerError(response, error);
    }
};
export const getUserById = async (id, response) => {
    try {
        if (!uuidValidate(id)) {
            return sendResponse(response, 400, { message: 'Invalid UUID. Must be a valid UUID' });
        }
        const user = users.find((u) => u.id === id);
        if (!user) {
            return sendResponse(response, 404, { message: `User with id ${id} does not exist` });
        }
        sendResponse(response, 200, user);
    }
    catch (error) {
        handleServerError(response, error);
    }
};
export const createUser = async (request, response) => {
    try {
        const body = await parseRequestBody(request);
        const { username, age, hobbies } = body;
        if (!username || !age || !hobbies) {
            return sendResponse(response, 400, { message: 'Invalid request body. Age / username / hobbies are missing' });
        }
        const newUser = {
            id: uuidv4(),
            username,
            age,
            hobbies,
        };
        users.push(newUser);
        return sendResponse(response, 201, newUser);
    }
    catch (e) {
        return sendResponse(response, 400, { message: 'Invalid request body. Could not parse JSON file' });
    }
};
export const updateUser = async (userId, request, response) => {
    try {
        if (!uuidValidate(userId)) {
            return sendResponse(response, 400, { message: 'Invalid user id. Must be a valid UUID' });
        }
        const user = users.find((u) => u.id === userId);
        if (!user) {
            return sendResponse(response, 404, { message: 'User with id ${userId} does not exist' });
        }
        const body = await parseRequestBody(request);
        user.username = body.username;
        user.age = body.age;
        user.hobbies = body.hobbies;
        return sendResponse(response, 200, user);
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            return sendResponse(response, 400, { message: 'Invalid request body. Could not parse JSON file' });
        }
        handleServerError(response, e);
    }
};
export const deleteUser = async (userId, response) => {
    try {
        if (!uuidValidate(userId)) {
            return sendResponse(response, 400, { message: 'Invalid user id. Must be a valid UUID' });
        }
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex === -1) {
            return sendResponse(response, 404, { message: 'User with id ${userId} does not exist' });
        }
        users.splice(userIndex, 1);
        return sendResponse(response, 204, null);
    }
    catch (error) {
        handleServerError(response, error);
    }
};
