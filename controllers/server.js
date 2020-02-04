const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// // Members api routes
app.use('/user', require('./controllers/UserController'));
app.use('/yelp', require('./controllers/YelpController'));
app.use('/route', require('./controllers/RouteController'));

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`The server is now listening on port 5000!`))

