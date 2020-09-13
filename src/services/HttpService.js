import axios from 'axios';
import isObject from 'lodash/isObject';

let globalHeaders = {};

export const getHeaders = () => globalHeaders;

export const setHeaders = (headers = {}) => {
  if (!isObject(headers)) {
    return;
  }

  globalHeaders = headers;
};

export const get = (url, parameters, customHeaders = {}) => axios.get(
  url,
  {
    headers: {
      ...getHeaders(),
      ...(isObject(customHeaders) ? customHeaders : {}),
    },
    params: {
      ...(isObject(parameters) ? parameters : {}),
    },
  },
);

export const post = (url, parameters, customHeaders = {}) => axios.post(
  url,
  {
    ...(isObject(parameters) ? parameters : {}),
  },
  {
    headers: {
      ...getHeaders(),
      ...(isObject(customHeaders) ? customHeaders : {}),
    },
  },
);

export const put = (url, parameters, customHeaders = {}) => axios.put(
  url,
  {
    ...(isObject(parameters) ? parameters : {}),
  },
  {
    headers: {
      ...getHeaders(),
      ...(isObject(customHeaders) ? customHeaders : {}),
    },
  },
);

export const remove = (url, customHeaders = {}) => axios.delete(
  url,
  {
    headers: {
      ...getHeaders(),
      ...(isObject(customHeaders) ? customHeaders : {}),
    },
  },
);
