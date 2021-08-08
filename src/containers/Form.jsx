import React, { useEffect } from 'react';
import { Buffer } from 'buffer';
import Payload from '../components/form/Payload';
import ParamsConfig from '../components/form/ParamsConfig';
import sendRequest from '../services/sendRequest.js';
import { addToHistory, getHistory } from '../services/localStorage.js';
import './Form.scss';

const fakeData = {
  url: 'https://www.onezoom.org/popularity/list',
  /*params: {
    key: 0,
    otts: 563159,
    expand_taxa: true,
    max: 12,
    names: true,
    include_raw: true,
    sort: 'standard'
  },*/
  params: {},
  request: {
    method: 'GET'
  }
};

export default function Form() {
  const [url, setUrl] = React.useState('');
  const [params, setParams] = React.useState({});
  const [request, setRequest] = React.useState({});
  const [auth, setAuth] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authBearerToken, setAuthBearerToken] = React.useState('');
  const [payload, setPayload] = React.useState();

  const [validJSON, setValidJSON] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [history, setHistory] = React.useState(getHistory());

  useEffect(() => {
    const previous = [...history].pop() || fakeData;

    setUrl(previous.url);
    setParams(previous.params);
    setRequest(previous.request);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!auth) {
      setUsername('');
      setPassword('');
    }
  }, [auth]);

  const handleBodyChange = e => {
    try { JSON.parse(e.target.value); }
    catch { 
      setValidJSON(false); 
      return;
    }

    setValidJSON(true);

    setRequest({ ...request, body: e.target.value });
  };

  const handleRequest = async e => {
    e.preventDefault();

    // set the body if relevant method
    if (['GET', 'DELETE'].includes(request.method)) {
      // eslint-disable-next-line no-unused-vars
      const { body: _, ...rest } = request;
      setRequest(rest);
    }

    // check for auth
    if (auth === 'basic') {
      const authHeader = 
        `${Buffer.from(username, 'base64')}:${Buffer.from(password, 'base64')}`
      ;
      const { headers } = request;
      headers['Authorization'] = `Basic ${authHeader}`;
      setRequest({ ...request, headers });
    } else if (auth === 'bearer') {
      const { headers } = request;
      headers['Authorization'] = `Bearer ${authBearerToken}`;
      setRequest({ ...request, headers });
    }

    // make the request, add to history if successful
    const resp = await sendRequest(url, params, request);
    if (resp.ok) {
      setPayload(await resp.json());
      addToHistory(url, params, request);
      setHistory(getHistory());
    }
  };

  return <div className="Form">
    <h2>postpost</h2>

    {!loading && <form onSubmit={handleRequest}>
      <fieldset name="url" onChange={e => setUrl(e.target.value)}>
        <legend>url</legend>
        <input 
          defaultValue={url}
          name="url"
          type="url" 
          placeholder="https://www.example.com/api/v1/fruit"
        />
        <button type="submit">send</button>
      </fieldset>

      <fieldset name="params">
        <legend>params</legend>
        <ParamsConfig params={params} setParams={setParams}/>
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

      <fieldset name="auth">
        <legend>auth</legend>
        <select 
          name="auth" 
          onChange={e => setAuth(e.target.value)}
          defaultValue={auth}
        >
          <option value="">none</option>
          <option value="basic">basic</option>
          <option hidden value="digest">digest</option>
          <option value="bearer">bearer</option>
        </select>
        {auth && <div>{auth === 'basic'
          ? <>
            <input 
              type="text" 
              name="username" 
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
            />
            <input 
              type="text" 
              name="password" 
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
            />
          </>
          : <input 
            type="text" 
            name="token" 
            placeholder="token"
            onChange={e => setAuthBearerToken(e.target.value)}
          />
        }</div>}
      </fieldset>

      <fieldset 
        onChange={handleBodyChange}
        style={{ 
          display: ['GET', 'DELETE'].includes(request.method) ? 'none' : '' 
        }}
      >
        <legend>request body</legend>
        <textarea 
          name="body" 
          placeholder="body" 
          defaultValue={JSON.stringify(
            request.body && JSON.parse(request.body), 
            null, 
            2
          )}
          style={{ backgroundColor: validJSON ? '#5f51' : '#d555' }}
        />
      </fieldset>
    </form>}

    <Payload payload={payload}/>

    {Boolean(history.length) && <><h3>history</h3>
      <div>
        {history.map(call => <p key={call.timestamp}>{call.url}</p>)}
      </div>
    </>}
  </div>;
}
