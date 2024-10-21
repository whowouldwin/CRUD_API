import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

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
