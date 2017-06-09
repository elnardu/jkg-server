const express = require("express"),
  User = require("../models/user"),
  jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', function(req, res) {
  User.create(req.body).then(user => {
    const payload = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email
    };
    const token = jwt.sign(payload, req.app.get('jwtsecret'), {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      name: user.name,
      surname: user.surname,
      token: 'JWT ' + token
    });
  }).catch(err => {
    console.log(err);
    let formattedError = {};
    for (fieldName in err.errors) {
      formattedError[fieldName] = {
        message: err.errors[fieldName].message,
        name: err.errors[fieldName].name
      }
    }

    res.status(400).json({error: formattedError})
  })
});

module.exports = router;
