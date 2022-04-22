const { SocketAddress } = require('net');
const { Socket, Namespace } = require('socket.io');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

io.on('connection', (socket) => {
  var ip = socket.conn.remoteAddress;
  const splitIP = ip.split(":");
  var ip = splitIP[3];
  console.log(ip + ' has connected');
  socket.on('disconnect', () => {
    console.log(ip + ' has disconnected');
  });
});

io.on("connection", (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log("MSG-" + msg);
  });
});
