var express = require('express');
var sys = require('util');
var oauth = require('oauth');
var mongo = require('mongoskin');
var keys = require('./keys')

var app = express();

var _fitbitConsumerKey = keys.fitbitConsumerKey;
var _fitbitConsumerSecret = keys.fitbitConsumerSecret;


function consumer() {
  return new oauth.OAuth(
    "http://api.fitbit.com/oauth/request_token", "http://api.fitbit.com/oauth/access_token",
    _fitbitConsumerKey, _fitbitConsumerSecret, "1.0", "http://127.0.0.1:5000/auth/fitbit/callback", "HMAC-SHA1");
}

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({
    secret: "secretkey"
  }));
  app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
  });
});


app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/auth/fitbit', function(req, res){
  consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("http://www.fitbit.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
    }
  });
});

app.get('/auth/fitbit/callback', function(req, res){
  sys.puts(">>"+req.session.oauthRequestToken);
  sys.puts(">>"+req.session.oauthRequestTokenSecret);
  sys.puts(">>"+req.query.oauth_verifier);
  consumer().getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      // Right here is where we would write out some nice user stuff
      //22QWR5
      // https://api.fitbit.com/1/user/22QWR5/activities/steps/date/today/1m.json
      consumer().get("https://api.fitbit.com/1/user/-/profile.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          res.send("Error" + sys.inspect(error), 500);
        } else {
          console.log("data is %j", data);
          data = JSON.parse(data);
          console.log(data.user.encodedId);
          mongo.db('localhost:27017/fitbit', {safe:true}).collection('oauth').insert(
            {
              'encodedId' : data.user.encodedId,
              'oauthAccessToken' : req.session.oauthAccessToken,
              'oauthAccessTokenSecret' : req.session.oauthAccessTokenSecret
            }, undefined, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(res);
            }
          });
          mongo.db('localhost:27017/fitbit', {safe:true}).collection('user_data').insert(
            {
              'encodedId' : data.user.encodedId,
              'profile' : data
            }, undefined, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(res);
            }
          });
          res.send(data);
        }
      });
    }
  });
});

app.get('steps/ryan', function(req, res) {
  consumer().get("https://api.fitbit.com/1/user/-/profile.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          res.send("Error" + sys.inspect(error), 500);
        } else {
          console.log("data is %j", data);
          data = JSON.parse(data);
          console.log(data.user.encodedId);
});
// /1/user/-/sleep/minutesAsleep/date/today/2010-08-27.xml
app.listen(5000);