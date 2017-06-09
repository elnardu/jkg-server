const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  passport = require('passport'),
  passportConfig = require('./passport.config'),
  path = require('path'),
  http = require('http').Server(app);

const config = require("./config");

mongoose.Promise = global.Promise; //tell mongoose to use default promises
mongoose.connect(config.database);

app.set('jwtsecret', config.jwtsecret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const staticPath = path.resolve(__dirname, '..', 'client', 'dist');
const authRouter = require('./routes/auth'),
  registerRouter = require('./routes/register'),
  postRouter = require('./routes/post');

app.use(passport.initialize());
passportConfig(passport);
app.use(express.static(staticPath));
app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/post', postRouter);


http.listen(config.port, function() {
  console.log("Listening on port " + config.port);
});
