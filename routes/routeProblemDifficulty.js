const express = require('express');
const router = express.Router();
const diffController = require('../Controllers/difficultyControllers');

router.get('/problem/difficulty/medium', diffController.problem_medium);

router.get('/problem/difficulty/easy', diffController.problem_easy);

router.get('/problem/difficulty/hard', diffController.problem_hard);

module.exports = router;