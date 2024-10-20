import { createServer } from 'http';
import * as dotenv from 'dotenv';
import { handleUserRoutes } from './routes/userRoutes.js';
dotenv.config();
const server = createServer((req, res) => {
    handleUserRoutes(req, res);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
