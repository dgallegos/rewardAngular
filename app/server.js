var express = require('express');
var http = require('https');
<<<<<<< HEAD
var Firebase = require('firebase');
var async = require('async');

=======
var options = {
  host: 'api.rewardstyle.com',
  path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000&limit=40',
};
>>>>>>> 3e6753033c84c0a70cf4e777f45ef5c609d991d1
var app = express();

app.configure(function () {
    app.use('/', express.static(__dirname));
});

app.get('/json', function (request, response) {

    // Grab request parameters to perform search

    var userSearchTerms = request.query['searchterms'];
    console.log(userSearchTerms);

    var options = {
        host: 'api.rewardstyle.com',
        path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000&limit=20',
    };

    http.get(options, function (res) {

        res.setEncoding('utf8');

        var data = ''

        res.on('data', function (chunk) {
            // console.log('BODY: ' + chunk);
            // response.json(chunk);
            data += chunk;
            console.log(chunk);

        });

        res.on('end', function () {
            var obj = JSON.parse(data);
            response.json(obj);
        })



        // }).on('error', function(e) {
        //   console.log('ERROR: ' + e.message);
        // });

    });

});


// favorites search

app.get('/favorites', function (request, response) {

    // Grab request parameters to perform search

    // var searchToken = request.query ['token'];

    var bloggerTokens = [{
            name: "Gabe Marshall",
            token: "325c1cd5606244517254b720e21258c8"
        }, {
            name: "David Gallegos",
            token: "b90afc2290d9e37d432fa6b4e4dea0d0"
        }
    ];

    // console.log(bloggerTokens[1]);
    var jsonArray = [];

    var returnFavorites = function (token, callback) {

        var options = {
            host: 'api.rewardstyle.com',
            path: '/v1/favorites?oauth_token=' + token + '',
        };

        http.get(options, function (res) {

            res.setEncoding('utf8');

            var data = ''

            res.on('data', function (chunk) {
                // console.log('BODY: ' + chunk);
                // response.json(chunk);
                data += chunk;
                // console.log(chunk);

            });

            res.on('end', function () {
                var obj = JSON.parse(data);
                jsonArray.push(obj);
                if (jsonArray.length === bloggerTokens.length) {
                    response.json(jsonArray);
                }

            });



        });
    };

    async.forEach(Object.keys(bloggerTokens), function (item) {
        returnFavorites((bloggerTokens[item].token));
        // tell async that the iterator has completed

    }, function (err) {
        console.log('iterating done');
    });




});



app.listen(8000);
