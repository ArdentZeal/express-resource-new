var express = require('express'),
    assert = require('assert'),
    should = require('should'),
    Resource = require('../');

describe("app.resource", function() {
  var app;
  
  beforeEach(function() {
    app = express.createServer();

    app.configure(function(){
      app.set('controllers', __dirname + '/controllers');
    });
  });
  
  it("should return a Resource object", function() {
    var articles, comments;
    articles = app.resource('articles', function() {
      comments = app.resource('comments');
    });
    
    articles.should.be.an.instanceof(Resource);
    comments.should.be.an.instanceof(Resource);
  });
  
  it("should create a resouces object in app", function() {
    var articles, comments;
    articles = app.resource('articles', function() {
      comments = app.resource('comments');
    });
    
    app.resources.should.be.a('object').and.have.property('articles', articles);
    app.resources.should.be.a('object').and.have.property('article_comments', comments);
  });
  
  it("should create all the appropriate routes for a resource", function() {
    var resource = app.resource('articles');
    
    resource.routes[0].path.should.equal("/articles.:format?");
    resource.routes[1].path.should.equal('/articles/new.:format?');
    resource.routes[2].path.should.equal('/articles.:format?');
    resource.routes[3].path.should.equal('/articles/:article.:format?');
    resource.routes[4].path.should.equal('/articles/:article/edit.:format?');
    resource.routes[5].path.should.equal('/articles/:article.:format?');
    resource.routes[6].path.should.equal('/articles/:article.:format?');
  });
  
  it("should allow options to be passed in", function() {
    var resource = app.resource('articles', { name: 'posts', id: 'id' });
    
    resource.routes[0].path.should.equal('/posts.:format?');
    resource.routes[1].path.should.equal('/posts/new.:format?');
    resource.routes[2].path.should.equal('/posts.:format?');
    resource.routes[3].path.should.equal('/posts/:id.:format?');
    resource.routes[4].path.should.equal('/posts/:id/edit.:format?');
    resource.routes[5].path.should.equal('/posts/:id.:format?');
    resource.routes[6].path.should.equal('/posts/:id.:format?');
  });
  
  it("should respond with correct action");
});