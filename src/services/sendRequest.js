/* eslint-disable no-console */

const params2string = params => encodeURIComponent(
  Object.entries(params).reduce((acc, [key, val]) => (
    `${acc}${((acc === '?') ? '' : '&')}${key}=${val}`
  ), '?')
);

const sendRequest = async (
  url, 
  params = {},
  data = {} // should contain method, body, and headers
) => (
  await fetch(
    url + (Object.keys(params).length ? params2string(params) : ''), 
    data
  )
    .then(resp => {
      console.log(resp);
      return resp;
    })
    .catch(err => console.log(err))
);

export default sendRequest;
