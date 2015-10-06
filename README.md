# dpd-raccoon

A Deployd module to interact with [the raccoon collaborative filtering engine](https://github.com/guymorita/recommendationRaccoon) in node.js.

Created for the [RedWire game engine](https://github.com/CyberCRI/RedWire) to suggest games to play.

Based on the [dpd-event](https://github.com/deployd/dpd-event) module. Supports all dpd-event features, and imports all raccoon methods as well.

### Installation

Copied from copied from dpd-event.

In your app's root directory, type `npm install dpd-event` into the command line or [download the source](https://github.com/deployd/dpd-event). This should create a `dpd-event` directory in your app's `node_modules` directory.

See [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.

### Usage

This resource offers GET and POST handlers.

Supports all [dpd-event](https://github.com/deployd/dpd-event) features as well as giving access to all [Raccoon functions](https://github.com/guymorita/recommendationRaccoon).

First, create a resource in the Deployd dashboard using the the Raccoon resource. Then add event handlers as you see fit.

Here's an example of how we like games in RedWire. 

```javascript
// Record that the current user likes a game
// Expecting a URL like /like/{gameId} 

if(!me) cancel("You need to be logged in to rate a game");

var gameId = parts[0];
if (!gameId) cancel("You must provide a game ID");

liked(me.id, gameId, function() {});
```

As you can see, dpd-raccoon brings in the `liked()` method from recommendationRaccoon.
