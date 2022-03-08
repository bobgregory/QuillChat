const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];

  request.on('error', (err) => {
    console.error(err);

  }).on('data', (chunk) => {
    body.push(chunk);

    consonle.log(chunk); //logs the data it recieved?ss

  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body
    response.on('error', (err) => {
        console.error(err);
      });
  
      response.writeHead(200, {'Content-Type': 'application/json'})
  
      const responseBody = { headers, method, url, body };
  
      response.write(JSON.stringify(responseBody));
      response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))
  });
}).listen(8080); // Activates this server, listening on port 8080.
