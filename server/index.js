const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const {
  API_PORT, APP_PROTOCOL, APP_HOST, APP_PORT,
} = process.env;

const app = express();

// Setup
app.use(cors({
  origin: `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`,
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.listen(API_PORT, () => {
  console.log('Initializing API...');
});
