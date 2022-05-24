const express = require('express');
const router = express.Router();

const topicController = require('../Controllers/topicControllers');


//routers by topic
router.get('/problem/topic/arrays', topicController.problem_array);

router.get('/problem/topic/binary-search', topicController.problem_binary);

router.get('/problem/topic/bit-manip', topicController.problem_bit);

router.get('/problem/topic/two-pointers', topicController.problem_two_pointers);


router.get('/problem/topic/dynamic-programming', topicController.problem_dynamic_programming);


router.get('/problem/topic/graphs', topicController.problem_graphs);

router.get('/problem/topic/greedy', topicController.problem_greedy);

router.get('/problem/topic/strings', topicController.problem_strings);

router.get('/problem/topic/trees', topicController.problem_trees);

router.get('/problem/topic/maths', topicController.problem_maths);

module.exports = router;





