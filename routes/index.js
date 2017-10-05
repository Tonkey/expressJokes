var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes')

/* GET home page. */
router.get('/jokeApp/', function(req, res, next) {
  res.render('index', { title: 'StudyWare Jokes website', userName: req.session.userName });
});

router.get('/jokeApp/joke', function(req, res, next){
  if(req.session.jokeCount){
    req.session.jokeCount ++;
  } else {
    req.session.jokeCount = 1;
  }
  res.render('joke', {joke : jokes.getRandomJoke()});
});

router.get('/jokeApp/jokes', function(req,res,next){
  if(req.session.jokesCount){
    req.session.jokesCount ++;
  } else {
    req.session.jokesCount = 1;
  }
  res.render('jokes', {jokes : jokes.allJokes});
});

router.get('/jokeApp/addJoke', function(req,res,next){
  res.render('addJoke')
});

router.post('/jokeApp/addJoke', function(req,res,next){
  var string = encodeURIComponent(req.body.addJokeField)
  res.redirect('/storeJoke?valid=' + string);
});

router.get('/jokeApp/storeJoke', function(req,res,next){
  var passedVariable = req.query.valid;
  jokes.addJoke(passedVariable);

  if(req.session.storeJokeCount){
    req.session.storeJokeCount ++;
  } else {
    req.session.storeJokeCount = 1;
  }

  res.redirect('/jokeApp/addJoke');
})

router.get('/jokeApp/login', function(req,res,next){
  res.render('login')
})

router.get('/jokeApp/logout', function(req,res,next){
  req.session.userName = jokes.logout()
  res.redirect('/JokeApp')
})

module.exports = router;
