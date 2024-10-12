import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("dist"));

app.get('/', (req, res) => {
    res.sendFile(join(process.cwd(), 'index.html'));
});

app.use(express.static(join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});
