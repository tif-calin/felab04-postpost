import React from 'react';
import propTypes from 'prop-types';
import QueryEntry from './ParamEntry';

const ParamsConfig = props => {

  return <table className="ParamsConfig" colSpan="3">
    <thead>
      <tr>
        <th>key</th>
        <th>value</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(props.params).map(([key, value]) => Boolean(key && value)
        && <QueryEntry 
          key={key}
          entry={{ key, value }} 
          locked
          params={props.params}
          updateParams={props.setParams}
        />
      )}
      <QueryEntry 
        key="new"
        entry={{}} 
        locked={false}
        updateParams={props.setParams}
        params={props.params}
      />
    </tbody>
  </table>;
};

ParamsConfig.propTypes = {
  params: propTypes.object,
  setParams: propTypes.func
};

export default ParamsConfig;
