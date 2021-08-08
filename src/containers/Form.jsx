import React, { useEffect } from 'react';
import Payload from '../components/form/Payload';
import QueryConfig from '../components/form/QueryConfig';
import sendRequest from '../services/sendRequest.js';
import './Form.scss';

const fakeData = {
  url: 'https://www.onezoom.org/popularity/list',
  queries: {
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
};

export default function Form() {
  const [url, setUrl] = React.useState('');
  const [queries, setQueries] = React.useState({});
  const [request, setRequest] = React.useState({});
  const [payload, setPayload] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [validJSON, setValidJSON] = React.useState(false);

  useEffect(() => {
    setUrl(fakeData.url);
    setQueries({});
    setRequest(fakeData.request);
    setLoading(false);
  }, []);

  const handleBodyChange = e => {
    let json;
    try { json = JSON.parse(e.target.value); }
    catch { 
      setValidJSON(false); 
      return;
    }
    setValidJSON(true);

    setRequest({ ...request, body: json });
  };

  const handleRequest = async e => {
    e.preventDefault();

    if (['GET', 'DELETE'].includes(request.method)) {
      const { body: _, ...rest } = request;
      setRequest(rest);
    }

    sendRequest(url, queries, request)
      .then(resp => resp.json())
      .then(json => setPayload(json))
    ;
  };

  return <div className="Form">
    <h2>postpost</h2>

    {!loading && <form onSubmit={handleRequest}>
      <fieldset name="url" onChange={e => setUrl(e.target.value)}>
        <legend>url</legend>
        <div>
          <input 
            defaultValue={url}
            name="url"
            type="url" 
            placeholder="https://www.onezoom.org/popularity/list"
          />
          <button type="submit">send</button>
        </div>
      </fieldset>

      <fieldset name="queries">
        <legend>queries</legend>
        <QueryConfig queries={queries} setQueries={setQueries}/>
      </fieldset>

      <fieldset name="method" onChange={
        e => setRequest({ ...request, method: e.target.value })
      }>
        <legend>method</legend>
        <label>
          <input type="radio" value="GET" name="method" 
            defaultChecked={request.method === 'GET'}
          />
          <span>GET</span>
        </label>
        <label>
          <input type="radio" value="POST" name="method" 
            defaultChecked={request.method === 'POST'}
          />
          <span>POST</span>
        </label>
        <label>
          <input type="radio" value="PUT" name="method" 
            defaultChecked={request.method === 'PUT'}
          />
          <span>PUT</span>
        </label>
        <label>
          <input type="radio" value="DELETE" name="method" 
            defaultChecked={request.method === 'DELETE'}
          />
          <span>DELETE</span>
        </label>
        <label>
          <input type="radio" value="PATCH" name="method" 
            defaultChecked={request.method === 'PATCH'}
          />
          <span>PATCH</span>
        </label>
      </fieldset>

      <fieldset 
        onChange={handleBodyChange}
        style={{ 
          display: ['GET', 'DELETE'].includes(request.method) ? 'none' : '' 
        }}
      >
        <legend>request body</legend>
        <textarea name="body" placeholder="body" 
          defaultValue={JSON.stringify(request.body, null, 2)}
          style={{ backgroundColor: validJSON ? '#5f51' : '#d555' }}
        />
      </fieldset>
    </form>}

    <Payload payload={payload}/>
  </div>;
}
