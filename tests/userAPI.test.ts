import request from 'supertest';
import server from '../src/index.ts';

describe('user API tests', () => {

  afterAll(async () => {
    server.close();
  });

  it('should create a new user and return the user object', async () => {
    const newUser = {
      username: 'Diana',
      age: 35,
      hobbies: ['gaming', 'coding'],
    };
    const response = await request(server).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('Diana');
    expect(response.body.age).toBe(35);
    expect(response.body.hobbies).toEqual(['gaming', 'coding']);
  });

  it('should update the created user by ID', async () => {
    const newUser = {
      username: 'Diana',
      age: 35,
      hobbies: ['gaming', 'coding'],
    };
    const createdResponse = await request(server).post('/api/users').send(newUser);
    const userId = createdResponse.body.id;
    const updatedUser = {
      username: 'Diana Updated',
      age: 36,
      hobbies: ['reading', 'traveling'],
    };
    const updateResponse = await request(server).put(`/api/users/${userId}`).send(updatedUser);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.id).toBe(userId);
    expect(updateResponse.body.username).toBe('Diana Updated');
    expect(updateResponse.body.age).toBe(36);
    expect(updateResponse.body.hobbies).toEqual(['reading', 'traveling']);
  });

  it('should delete the created user by ID', async () => {
    const newUser = {
      username: 'Diana',
      age: 35,
      hobbies: ['gaming', 'coding'],
    };
    const createdResponse = await request(server).post('/api/users').send(newUser);
    const userId = createdResponse.body.id;
    const deleteResponse = await request(server).delete(`/api/users/${userId}`);
    expect(deleteResponse.status).toBe(204);
  });
});


