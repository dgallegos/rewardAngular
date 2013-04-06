var util = require('util'),
    connect = require('connect'),
    port = 8000;

var express = require('express');
var http = require('https');
var options = {
  host: 'api.rewardstyle.com',
  path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000',
};
var app = express();


app.get('/', function(request, response) {
 // response.sendfile(__dirname + "/index.html");

	http.get(options, function(res) {
	  
	  res.setEncoding('utf8');

	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	    response.json(chunk);
	  });



	}).on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});

});


app.listen(8080);

connect.createServer(connect.static(__dirname)).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press CTRL + C to stop the web server');