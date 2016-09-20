var http=require('http'); 
var fs=require('fs');
var path=require('path');
var mime = require('mime');
var express = require('express');
var app = express();
//Stores the cached files
var cache = {};
var startPath = 'src'; 
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

app.all('*',function (request, response) {
    if (request.url == '/') {
        filepath = startPath + '/index.html';
    }
    else {
        filepath = startPath + request.url;
    };
    var absPath = './' + filepath;
    serveStatic(response, cache, absPath);
//    console.log(request.connection.remoteAddress);
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'+startPath));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});