var express = require('express');
var logger = require('morgan');

console.log('Server started on port ' + process.env.PORT);

// Import all the models
//require('./models');

var app = express();
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.json({Hello: "World!"})
})
app.use('/api', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send();
});

app.use((err, req, res, next) => {
    const sendErr = obj => res.status(400).send(obj);
    if (!err) return sendErr();
    if (err instanceof Error) return sendErr({ error: err.message });
    sendErr({ error: err });
  });
  
  module.exports = app;
  