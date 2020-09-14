const express = require('express');
const last = require('lodash/last');
const findIndex = require('lodash/findIndex');
const remove = require('lodash/remove');
const filter = require('lodash/filter');
const includes = require('lodash/includes');

const DATA = require('../public/data.json');

let { data } = DATA;

const router = express.Router();

const getNextId = () => {
  const lastRecord = last(data);
  const newId = lastRecord.id + 1;
  return newId;
};

router.get('/list', (httpRequest, httpResponse) => {
  const search = httpRequest.query.q;

  if (!search) {
    return httpResponse
      .status(200)
      .json(data);
  }

  const filtered = filter(data, item => includes(item.iata, search)
      || includes(item.icao, search)
      || includes(item.airline, search));

  return httpResponse
    .status(200)
    .json(filtered);
});

router.post('/list', (httpRequest, httpResponse) => {
  const {
    iata = '',
    icao = '',
    airline = '',
    callsign = '',
    country = '',
  } = httpRequest.body;

  const newRecord = {
    id: getNextId(),
    iata,
    icao,
    airline,
    callsign,
    country,
  };

  data = [
    ...data,
    newRecord,
  ];

  return httpResponse
    .status(200)
    .json(newRecord);
});

router.put('/list/:id', (httpRequest, httpResponse) => {
  const id = parseInt(httpRequest.params.id);

  const recordIndex = findIndex(data, { id });
  const notFound = recordIndex === -1;

  const {
    iata = '',
    icao = '',
    airline = '',
    callsign = '',
    country = '',
  } = httpRequest.body;

  const newRecord = {
    id: notFound ? getNextId() : id,
    iata,
    icao,
    airline,
    callsign,
    country,
  };

  if (notFound) {
    data = [
      ...data,
      newRecord,
    ];
  } else {
    data[recordIndex] = newRecord;
  }

  return httpResponse
    .status(200)
    .json(newRecord);
});

router.delete('/list/:id', (httpRequest, httpResponse) => {
  const id = parseInt(httpRequest.params.id);

  const record = remove(data, { id });

  return httpResponse
    .status(200)
    .json(record);
});

module.exports = router;
