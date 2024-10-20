import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as dotenv from 'dotenv';
import { handleUserRoutes } from './routes/userRoutes.ts';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as process from 'node:process';

dotenv.config();


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  handleUserRoutes(req, res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server