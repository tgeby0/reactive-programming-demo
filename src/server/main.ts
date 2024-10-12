import express from 'express';
import { join } from 'node:path';
import ViteExpress from "vite-express";
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
    res.sendFile(join(process.cwd(), 'index.html'));
});

ViteExpress.listen(app, 3006, () => {
    console.log('Server is running on http://localhost:3000/');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
