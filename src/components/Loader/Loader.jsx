import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => (
  <div>
    {
      isLoading && <div className="loader" />
    }
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
