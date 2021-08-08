import React from 'react';
import propTypes from 'prop-types';

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
  payload: propTypes.object
};

export default Payload;
