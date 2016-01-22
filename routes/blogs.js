//
//  blogs.js
//  kdicAPI
//
//  Created by Shaun Mataire on 1/14/16.
//  Copyright © 2016 AppDev. All rights reserved.
//

var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET blogs home. */
router.get('/', function(req, res, next) {

  var blogsUrl = 'http://kdic.grinnell.edu'

  request(blogsUrl, function(error, response, html){
    //check whether there was an error making the request
    if(!error){
      //get the cheerio html object
      var $ = cheerio.load(html);

      //json result = articles object that is an array of json objects
      var blogsJson = {
        "articles": []
      }

      //we'' use the unique header as a starting point
      $('div .posts-layout').filter(function(){

        //get the html object data
        var data = $(this)

        //debug
        console.log(data.html());
      });

    }
  });
  res.send('200');
});

module.exports = router;
