import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({...res,
    jsonResult
  }));
}

function errorMessageParse(res) {
  const {
    success,
    message
  } = res.jsonResult;
  if (success !== "0") {
    return Promise.reject(message);
  }
  return res;
}

function fetchUtils(url, options) {
  const opts = {...options
  };
  opts.headers = {
    ...opts.headers,
    // authorization: cookie.get('authorization') || '',
  };

  return fetch(url, opts)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export default fetchUtils;
