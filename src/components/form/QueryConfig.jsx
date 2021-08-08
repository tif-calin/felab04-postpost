import React from 'react';
import propTypes from 'prop-types';
import QueryEntry from './QueryEntry';

const QueryConfig = props => {

  return <table className="QueryConfig" colSpan="3">
    <thead>
      <tr>
        <th>key</th>
        <th>value</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(props.queries).map(([key, value]) => Boolean(key && value)
        && <QueryEntry 
          key={key}
          entry={{ key, value }} 
          locked
          queries={props.queries}
          updateQueries={props.setQueries}
        />
      )}
      <QueryEntry 
        key="new"
        entry={{}} 
        locked={false}
        updateQueries={props.setQueries}
        queries={props.queries}
      />
    </tbody>
  </table>;
};

QueryConfig.propTypes = {
  queries: propTypes.object,
  setQueries: propTypes.func
};

export default QueryConfig;
