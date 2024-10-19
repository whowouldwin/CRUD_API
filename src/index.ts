import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('Server started on port', PORT);
