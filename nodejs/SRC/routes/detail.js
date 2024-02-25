var express = require('express');
const router = express.Router();

const detailController = require('../app/controllers/detailController');
router.post('/store', detailController.store);
router.get('/create', detailController.create);
router.put('/:id', detailController.update);
router.delete('/:id', detailController.delete);
router.get('/:id/edit', detailController.edit);
router.get('/:slug', detailController.show);

module.exports = router;
