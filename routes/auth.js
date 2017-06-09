const express = require('express'),
  User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  passport = require('passport');

const router = express.Router();

router.post('/', passport.authenticate('local', {session: false}), function(req, res) {
  const payload = {
    _id: req.user._id,
    name: req.user.name,
    surname: req.user.surname,
    email: req.user.email
  };
  const token = jwt.sign(payload, req.app.get('jwtsecret'), {
    expiresIn: 86400 // expires in 24 hours
  });
  return res.json({
    name: req.user.name,
    surname: req.user.surname,
    token: 'JWT ' + token
  });
});

module.exports = router;
