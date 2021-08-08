import React, { useState } from 'react';
import propTypes from 'prop-types';

const QueryEntry = props => {

  // on save, trigger setQueries, lock
  // on edit, unlock
  // on remove, remove row and trigger function to re-read query form

  const [locked, setLocked] = useState(props.locked);
  const [key, setKey] = useState(props.entry.key);
  const [value, setValue] = useState(props.entry.value);

  const handleEdit = () => setLocked(false);

  const handleDelete = e => {
    const newQueries = { ...props.queries };
    delete newQueries[e.target.dataset['queryKey']];
    props.updateQueries(newQueries);
  };

  const handleSave = e => {
    if (key && value && !Object.keys(props.queries).includes(key)) {
      const newQueries = { ...props.queries };
      delete newQueries[e.target.dataset['queryKey']];
      newQueries[key] = value;
      setLocked(true);
      setKey(props.entry.key);
      setValue(props.entry.value);
      props.updateQueries(newQueries);
    }
  };

  return <tr className="QueryEntry">
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

QueryEntry.propTypes = {
  entry: propTypes.object,
  locked: propTypes.bool,
  queries: propTypes.object.isRequired,
  updateQueries: propTypes.func.isRequired
};

export default QueryEntry;
