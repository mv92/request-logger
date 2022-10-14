const router = require('express').Router();

// import
router.use(require('./v1'));

router.get('/:id*?', (_, res) => {
	res.set('Content-type', 'text/plain');
	res.send(Buffer.from(''));
});

module.exports = router;
