// This file is for Vercel serverless deployment
import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, '../data/cities.json'));
const middlewares = jsonServer.defaults();

// Add delay middleware
server.use((req, res, next) => {
    setTimeout(next, 500);
});

server.use(middlewares);
server.use('/api', router);

export default server;