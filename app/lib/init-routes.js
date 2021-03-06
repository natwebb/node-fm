'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var albums = require('../routes/albums');

  app.get('/', d, home.index);
  app.get('/albums', d, albums.index);
  app.get('/albums/:id', d, albums.show);
  app.get('/artists/:name', d, artists.show);
  app.post('/albums', d, albums.create);
  app.post('/albums/:id', d, albums.addSong);
  app.put('/albums/:id', d, albums.update);
  app.del('/albums/:id', d, albums.destroy);
  console.log('Routes Loaded');
  fn();
}

