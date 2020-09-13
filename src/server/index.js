require('dotenv').config();
const express = require('express');
const apiRouter = require('./router');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/api', apiRouter);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
