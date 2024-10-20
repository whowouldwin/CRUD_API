import request from 'supertest';
import server from '../src/index.ts';
import { users } from '../src/models/user.ts';

describe('user API tests', () => {
  // let userId: string;

  beforeEach(() => {
    users.length = 0;
  })

  afterAll(async () => {
    server.close();
  })

  it('Should return an empty array initially', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  })
})