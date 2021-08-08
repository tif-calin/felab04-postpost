/* eslint-disable max-len */
import sendRequest from './sendRequest.js';

const API_CALLS = [
  {
    url: 'https://www.onezoom.org/popularity/list?key=0&otts=563159&expand_taxa=True&max=12&names=True&include_raw=True&sort=standard',
    params: {},
    request: {
      method: 'GET'
    }
  },
  {
    url: 'https://www.onezoom.org/popularity/list',
    params: {
      key: 0,
      otts: 563159,
      expand_taxa: true,
      max: 12,
      names: true,
      include_raw: true,
      sort: 'standard'
    },
    request: {
      method: 'GET'
    }
  },
  {
    url: 'https://api.opentreeoflife.org/v3/tnrs/autocomplete_name',
    params: {},
    request: {
      method: 'POST',
      body: JSON.stringify({ name: 'Quercus alba', context_name: 'All life' })
    }
  }
];

describe('test sendRequest calls', () => {
  test('test a GET call with params in url', async () => {
    const resp = await sendRequest(...Object.values(API_CALLS[0]));
    const json = await resp.json();

    expect(resp.status).toBe(200);
    expect(json.data).toBeDefined();
  });

  test('test a POST call with a body', async () => {
    const resp = await sendRequest(...Object.values(API_CALLS[2]));
    const json = await resp.json();

    expect(resp.status).toBe(200);
    expect(json.length).toBeGreaterThan(0);
  });
});
