/* eslint-disable no-console */

const queries2string = queries => encodeURIComponent(
  Object.entries(queries).reduce((acc, [key, val]) => (
    `${acc}${((acc === '?') ? '' : '&')}${key}=${val}`
  ), '?')
);

const sendRequest = async (
  url, 
  queries = {},
  data = {} // should contain method, body, and headers
) => (
  await fetch(url + queries2string(queries), data)
    .then(resp => resp)
    .catch(err => console.log(err))
);

export default sendRequest;
