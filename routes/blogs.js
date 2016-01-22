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

        //loop through articles
        data.children().each(function(){

          //varticle objects
          var articleTitle, fullArticleUrl, articleText, datePosted, author

          //artcle object
          var articleJson = {
            articleTitle: "",
            fullArticleUrl: "",
            articleText: "",
            datePosted: "",
            author: ""
          }

          //artcle looper
          var looper = 0;

          $(this).children().each(function(){
            console.log($(this).first().first().html());
            switch (looper) {
              case 0:
                articleJson.articleTitle = $(this).first().first().first().text(); //please get this by ids
                break;
              case 1:
                articleJson.fullArticleUrl = $(this).first().first().first().attr('href');
                break;
              case 2:
                articleJson.articleText = "shaun";
                break;
              case 3:
                articleJson.datePosted = "shaun";
                break;
              case 4:
                articleJson.author = "shaun";
                break;
              default:

            }
            looper++;
          });
          blogsJson.articles.push(articleJson);
          console.log('****');
        });

      });
      //sent articles
      res.send(JSON.stringify(blogsJson));
    }
  });

});

module.exports = router;
