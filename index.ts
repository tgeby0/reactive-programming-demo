import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.sendFile(join(process.cwd(), 'index.html'));
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});