import path from 'path';
import express from 'express';
import serverDev from './server.dev';
import serverIO from './server.io';

const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));

// dev server compiled files - webpack dev
serverDev(app);

// socket.io server
const server = serverIO(app);

const port = process.env.PORT || 9999;
// listen with server from socket.io code unless it won't listen (if you use app)
server.listen(port, () => {
    console.log(`Server started http://localhost:${port}/`);
});
