import request from 'supertest';
import server from '../src/index.ts';

describe('user API tests', () => {

  afterAll(async () => {
    server.close();
  })

  it('should create a new user and return the user object', async () => {
    const newUser = {
      username: 'Diana',
      age: 35,
      hobbies: ['gaming', 'coding'],
    }
    const response = await request(server).post('/api/users').send(newUser)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('Diana');
    expect(response.body.age).toBe(35);
    expect(response.body.hobbies).toEqual(['gaming', 'coding']);

  });
})


