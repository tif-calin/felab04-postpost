import React from 'react';
import PropTypes from 'prop-types';

const Payload = props => {
  return <div className="Payload">
    <fieldset>
      <legend>response body</legend>
      <pre><code>
        {JSON.stringify(props.payload, null, 2)}
      </code></pre>
    </fieldset>
  </div>;
};

Payload.propTypes = {
  payload: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired
};

export default Payload;
