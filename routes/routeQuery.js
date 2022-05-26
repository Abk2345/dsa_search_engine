const express = require('express');
const router = express.Router();
const queryController = require('../Controllers/queryController');

//routes search queries
router.post('',  queryController.post_from_mainpage);

router.post('/home/', queryController.post_from_mainpage);


module.exports = router;