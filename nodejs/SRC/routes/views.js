var express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewsController');

router.get('/nho', newController.show);
router.get('/', newController.index);

module.exports = router;
