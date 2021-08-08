const router = require('express').Router();

const handlers = require('../handlers/handler');

router.get('/get-items', handlers.getItems);

router.post('/upload-file', handlers.postUpload);

module.exports = router;