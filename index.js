const { SocketAddress } = require('net');
const { Socket, Namespace } = require('socket.io');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/sound/', (req,res) =>{
	console.log(req);
	res.sendFile(__dirname + "/sound/"+req.query.file);
});

app.get("/style.css",(req,res) =>{
	res.sendFile(__dirname+ "/style.css");
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
    let unixTime = new Date().getTime();
    let msgObj = JSON.parse(msg);
    msgObj.timestamp = unixTime;
    //var msg = unixTime + " - " + msg;
    let msg2 = JSON.stringify(msgObj);
    io.emit('chat message', msg2);
    console.log("MSG-" + msg2);
  });
});
