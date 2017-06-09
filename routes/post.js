const express = require('express'),
  Post = require('../models/post'),
  ObjectId = require('mongoose').Types.ObjectId;
  passport = require('passport');

const router = express.Router();

router.post('/get', (req, res) => {
  // TODO: добавить фильтры для поиска
  Post.find({}).sort({createdAt: -1}).limit(10).then(posts => {
    res.json(posts);
  })
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.create(Object.assign(req.body, {userid: new ObjectId(req.user._id)})).then(post => {
    res.json({success: true});
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
})

router.post('/getById', (req, res) => {
  Post.findOne({_id: req.body._id}).then(post => {
    res.json(post);
  })
});

module.exports = router;
