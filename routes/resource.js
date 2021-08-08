const router = require('express').Router();

const handlers = require('../handlers/handler');

router.get('/get-items', handlers.getItems);

router.post('/post-item', handlers.postItem);

module.exports = router;