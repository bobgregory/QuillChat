const http = require("http");

const port = process.env.port || 3000;

const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const todo = JSON.parse(data).todo
    console.log(todo);
    res.end(todo)
})

server.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})