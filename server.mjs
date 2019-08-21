import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log(`${socket.id} connected`);
});

// const bodyParser = require('body-parser');
// const routes = require('./routes');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// app.use(routes);

const port = process.env.PORT || 9999;
app.listen(port, () => {
    console.log(`Server started http://localhost:${port}/`);
});
