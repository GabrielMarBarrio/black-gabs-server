const http = require('http');
const fs = require('fs');
const about = require('./WWW/about.json')

http.createServer((request, response) => {

    if(request.url){

        const file = request.url == '/' ? './WWW/index.html' : `./WWW${request.url}`;

        fs.readFile(file, (err, data) => {
        	
        	if(request.url == '/about'){
        		response.writeHead(200, {"Content-Type": "application/json"});
        		response.write(JSON.stringify(about));
        	}else if(err){
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("NOT FOUND");
            }else{
                if(file.split('.').pop() == 'json'){
                    response.writeHead(200, {"Content-Type": "application/json"});
                }else if(file.split('.').pop() == 'png'){
                    response.writeHead(200, {"Content-Type": "image/jpg"}); 
                }else if(file.split('.').pop() == 'pdf'){
                    response.writeHead(200, {"Content-Type": "application/pdf"}); 
                }else{
                    response.writeHead(200, {"Content-Type": "text/html"}); 
                }
                response.write(data);
            }
            response.end();
        });
    }

}).listen(process.env.PORT || 4000);
