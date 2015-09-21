var Resource = require('deployd/lib/resource')
  , Script = require('deployd/lib/script')
  , util = require('util')
  , raccoon = require('raccoon');

var RACCOON_METHODS = ["stat", "liked", "disliked", "recommendFor", "bestRated", "worstRated", "bestRatedWithScores", "mostLiked", "mostDisliked", "usersWhoLikedAlsoLiked", "mostSimilarUsers", "leastSimilarUsers", "likedBy", "likedCount", "dislikedBy", "dislikedCount", "allLikedFor", "allDislikedFor", "allWatchedFor"];

// Connect to Raccoon
// TODO: make this configurable
raccoon.connect(6379, "localhost");
console.log("Logged into Raccoon");

function RaccoonResource() {
  Resource.apply(this, arguments);
}
util.inherits(RaccoonResource, Resource);

RaccoonResource.label = "Raccoon";
RaccoonResource.events = ["get", "post"];

module.exports = RaccoonResource;

RaccoonResource.prototype.clientGeneration = true;

RaccoonResource.prototype.handle = function (ctx, next) {
  var parts = ctx.url.split('/').filter(function(p) { return p; });

  var result = {};

  var domain = {
      url: ctx.url
    , parts: parts
    , query: ctx.query
    , body: ctx.body
    , 'this': result
    , setResult: function(val) {
      result = val;
    }
  };

  // Can't just import all of raccoon into domain, so we copy over function references
  for(var i = 0; i < RACCOON_METHODS.length; i++) {
    domain[RACCOON_METHODS[i]] = raccoon[RACCOON_METHODS[i]];
  }

  if (ctx.method === "POST" && this.events.post) {
    this.events.post.run(ctx, domain, function(err) {
      ctx.done(err, result);
    });
  } else if (ctx.method === "GET" && this.events.get) {
    this.events.get.run(ctx, domain, function(err) {
      ctx.done(err, result);
    });
  } else {
    next();
  }
};