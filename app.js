// http module is used to make http requests
const http = require('http');

const fs = require('fs');


// create a server
const server = http.createServer((req, res) => {
    // console.log(req);
    // const / let
    const { url, method } = req;
    console.log(url, method);

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write(`<body>
                        <form action="/message" method="POST"> 
                            <input type="text" name="message">
                            <button type="submit"> Send </button>
                        </form>
                    </body>`);
        res.write('</html>');
        res.end();
    
    } if(url === '/message' && method ==='POST') {      
        const body = [];
        req.on('data', (chunck) => {
            console.log(chunck);      
            body.push(chunck);
        }).on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            // enregistre dans un fichier
            fs.writeFile('Message.txt', parseBody, function  (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Fichier créé !');
                }
            });
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        }).on('error', (err) => {
            console.log(err);
        })       
    } 

  
    
    // send a response
    //res.writeHead(200, { 'Content-Type' :  'text/plain'});
    //res.end("Hello world");
})

// écoute sur le port 3000
server.listen(3000);