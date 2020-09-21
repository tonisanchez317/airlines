const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const {
  APP_HOST, APP_PORT, API_PORT, NODE_ENV,
} = process.env;

const app = express();

const port = NODE_ENV === 'production' ? APP_PORT : API_PORT;

// Setup
app.use(cors({
  origin: `//${APP_HOST}:${port}`,
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

if (NODE_ENV === 'production') {
  app.use(express.static('dist'));

  app.use('*', (httpRequest, httpResponse) => httpResponse
    .status(200)
    .sendFile(`${__dirname}/../public/index.html`));
}

app.listen(port, () => {
  console.log(`Listening in port ${port}...`);
});
