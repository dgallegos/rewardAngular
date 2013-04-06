var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = "fTxFCJK61JT8YijMDlykjw";
var TWITTER_CONSUMER_SECRET = "iqbk2wvvsw9iPifpia7mxQvjdM5Ty3Nad7nKJ3sRc8";

var http = require('https');
var Firebase = require('firebase');
var async = require('async');
var bloggerTokens = require('./modules/bloggertokens');



/* Authentication */

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the TwitterStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Twitter profile), and
//   invoke a callback with a user object.
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://rewardrobe.jit.su/authenticated"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

/* End of Authentication */


var options = {
  host: 'api.rewardstyle.com',
  path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000&limit=40',
};

var app = express();

// app.configure(function () {
//     app.use('/', express.static(__dirname));
// });


app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/'));
});

// app.get('/', function (request, response){
//     response.render('index.html');
// })

app.get('/authtest', function(request, response){
    response.render('index.html');
})


app.get('/json', function (request, response) {

    // Grab request parameters to perform search

    var userSearchTerms = request.query['searchterms'];
    

    var options = {
        host: 'api.rewardstyle.com',
        path: '/v1/search?oauth_token=325c1cd5606244517254b720e21258c8&keywords=&priceMin=1&priceMax=1000&limit=20',
    };

    http.get(options, function (res) {

        res.setEncoding('utf8');

        var data = ''

        res.on('data', function (chunk) {
            data += chunk;
            console.log(chunk);

        });

        res.on('end', function () {
            var obj = JSON.parse(data);
            response.json(obj);
        })


    });

});


// favorites search

app.get('/favorites', function (request, response) {

    // if (request.isAuthenticated())


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

app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    // The request will be redirected to Twitter for authentication, so this
    // function will not be called.
});



app.listen(8000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login.html')
}
