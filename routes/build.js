const express = require('express');
const router = express.Router();
const buildController = require('../controllers/build_controller');

const githubPayload = require('../models/githubPayload');
// !! TODO sanitize inputs

//router.post('/build',
router.post('/', githubPayload.validate, buildController.build);

router.get('/', function(req, res){
  res.sendStatus(404);
});

module.exports = router;
