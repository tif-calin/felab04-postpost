import React, { useState } from 'react';
import propTypes from 'prop-types';

const ParamsEntry = props => {

  // on save, trigger setparams, lock
  // on edit, unlock
  // on remove, remove row and trigger function to re-read query form

  const [locked, setLocked] = useState(props.locked);
  const [key, setKey] = useState(props.entry.key);
  const [value, setValue] = useState(props.entry.value);

  const handleEdit = () => setLocked(false);

  const handleDelete = e => {
    const newParams = { ...props.params };
    delete newParams[e.target.dataset['queryKey']];
    props.updateParams(newParams);
  };

  const handleSave = e => {
    if (key && value && !Object.keys(props.params).includes(key)) {
      const newParams = { ...props.params };
      delete newParams[e.target.dataset['queryKey']];
      newParams[key] = value;
      setLocked(true);
      setKey(props.entry.key);
      setValue(props.entry.value);
      props.updateParams(newParams);
    }
  };

  return <tr className="ParamsEntry">
    <td>
      <input 
        className="query-key"
        type="text" 
        placeholder="KEY" 
        disabled={locked} 
        defaultValue={props.entry.key || null}
        onChange={e => setKey(e.target.value)}
      />
    </td>
    <td>
      <input 
        className="query-val"
        type="text" 
        placeholder="VALUE" 
        disabled={locked} 
        defaultValue={props.entry.value || null}
        onChange={e => setValue(e.target.value)}
      />
    </td>
    <td>{locked
      ? <span>
        <button type="button" onClick={handleEdit}>edit</button>
        <button 
          type="button" 
          onClick={handleDelete} 
          data-query-key={props.entry.key}
        >remove</button>
      </span>
      : <button 
        type="button" 
        onClick={handleSave}
        data-query-key={props.entry.key}
      >save</button>
    }</td>
  </tr>;

};

ParamsEntry.propTypes = {
  entry: propTypes.object,
  locked: propTypes.bool,
  params: propTypes.object.isRequired,
  updateParams: propTypes.func.isRequired
};

export default ParamsEntry;
