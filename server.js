var http=require('http'); 
var fs=require('fs');
var path=require('path');
var mime = require('mime');
//Stores the cached files
var cache = {};
var startPath = 'pages'; 
/*Stores the base folder name 
where the files will be fetched from
*/

/*This function sends the 404 response when the page requested is not found*/
function send404(response)
{
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('The Error is 404: Sorry resource/file not found.');
	response.end();
}

/*Sends the requested static file if present in the path*/
function sendFile(response,filepath,fileContents)
{
	response.writeHead(200,
		{'Content-Type':mime.lookup(path.basename(filepath))}
		);
	response.end(fileContents);
}
function serveStatic(response,cache,absPath){
	if (cache[absPath]) {
		sendFile(response,absPath,cache[absPath]);
	}
	else{
		fs.exists(absPath,function(exists){
			if (exists) {
				fs.readFile(absPath,function(err,data){
					if (err) {
						send404(response);
					} 
					else{
						cache[absPath]=data;
						sendFile(response,absPath,cache[absPath]);
					};
				});
			} 
			else{
				send404(response);
			};
		});
	};

}

var server = http.createServer(function (request, response) {
    if (request.url == '/') {
        filepath = startPath + '/CalendarWelcome.html';
    }
    else {
        filepath = startPath + request.url;
    };
    var absPath = './' + filepath;
    serveStatic(response, cache, absPath);
//    console.log(request.connection.remoteAddress);
});
var port=40400;
server.listen(port,function(){
	console.log("Server for Calendar listening at "+port.toString());
});