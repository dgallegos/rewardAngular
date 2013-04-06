
var express = require('express');
var http = require('https');
var options = {
  host: 'api.rewardstyle.com',
  path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000&limit=40',
};
var app = express();


app.get('/json', function(request, response) {
 // response.sendfile(__dirname + "/index.html");

	http.get(options, function(res) {
	  
	  res.setEncoding('utf8');
	  
	  var data = ''

	  res.on('data', function (chunk) {
	   // console.log('BODY: ' + chunk);
	    // response.json(chunk);
	    data += chunk;
	    console.log(chunk);

	  });

    res.on('end',function(){
        var obj = JSON.parse(data);
        response.json( obj );
    })



	// }).on('error', function(e) {
	//   console.log('ERROR: ' + e.message);
	// });

	});

});

app.configure(function(){
  app.use('/', express.static(__dirname));
 
});

app.listen(8000);
