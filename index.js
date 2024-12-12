const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const volleyball = require('volleyball');

require('dotenv').config();

const {
	PORT = 3000,
	NODE_ENV = 'production', // by default assume production
} = process.env;
const isDev = NODE_ENV === 'dev';

// ERROR HANDLING
const errorHandler = (err, req, res, next) => {
	// skip this and move to next handler if we already sent some headers
	if (res.headersSent) return next(err);

	// log to console only if we know that we are on dev env
	if (isDev) console.error(err);

	res.status(500).json(err);
};

// APP
const app = express();
// for cleaner structure, we import all other routes inside index file. to avoid modifying server startup settings.
const router = require(__dirname + '/routes/index');

// enable and allow all CORS
app.use(cors());
// enable body parsing middleware
app.use(express.json());
// enabling url params decoding
app.use(express.urlencoded({ extended: true }));
// setting up basic http headers by default for security related reasons
app.use(helmet());

// LOGGER to make the console lines short, colorful and informative
app.use(volleyball);

// import all our routes into the app
app.use(router);

// ERROR Handling middleware
app.use(errorHandler);

let listenerCallback = undefined;

if (isDev) {
	listenerCallback = () => {
		console.log(`Listens on port: ${PORT}.\n`, `Available at: http://localhost:${PORT}`);
	};
}

app.listen(PORT, listenerCallback);
