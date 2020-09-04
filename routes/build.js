const express = require('express');
const router = express.Router();
const buildController = require('../controllers/build_controller');

// !! TODO sanitize inputs

//router.post('/build',
router.post('/', buildController.build);

router.get('/', function(req, res){
  res.sendStatus(404);
});

module.exports = router;


function githubPayload() {

  return

}
