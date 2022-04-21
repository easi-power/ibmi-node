#!/QOpenSys/pkgs/bin/node

const fcgi = require('node-fastcgi');
const fs = require('fs'); 

const fcgiServer = fcgi.createServer((req, res) => {
  fs.exists(app, (exists) => {
    if(exists){
      // Load the javascript module according the URL requested
      const handler = require(app);
      handler.process(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});
fcgiServer.listen();  //Local mode