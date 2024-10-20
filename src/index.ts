import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as dotenv from 'dotenv';
import { handleUserRoutes } from './routes/userRoutes.js';
import { sendResponse } from './utils/responseHelper.js';

dotenv.config();


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if(req.url?.startsWith('/api/users')) {
    handleUserRoutes(req, res);
  } else {
    sendResponse(res, 404, { message: 'Not found.' });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
