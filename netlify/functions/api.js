import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, '../../data/cities.json'));
const middlewares = jsonServer.defaults();

// Add CORS headers
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

server.use(middlewares);

// Add delay
server.use((req, res, next) => {
    setTimeout(next, 500);
});

server.use(router);

export const handler = async (event) => {
    const response = await new Promise((resolve, reject) => {
        server(event, {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Server running' })
                });
            }
        });
    });

    return response;
};