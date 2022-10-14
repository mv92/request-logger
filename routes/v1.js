const getCircularReplacer = require('../helpers/getCircularReplacer');
const router = require('express').Router();

const callback = (req, res) => {
	let responseObject = {
		headers: req.headers,
		url: req.url,
		method: req.method,
		params: req.params,
		query: req.query,
		body: req.body,
	};

	if (process.env.NODE_ENV === 'dev' || process.env.RAILWAY_ENVIRONMENT === 'dev') {
		responseObject = JSON.parse(JSON.stringify(req, getCircularReplacer()));

		console.log(responseObject)
	};

	res.status(200).json(responseObject);
};

router.all('/v1/:id*?/:action*?', callback);

module.exports = router;
