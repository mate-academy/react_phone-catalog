import React from 'react';

const Loader = ({ isLoading }) => (
  <div>
    {
      isLoading && <div className="loader" />
    }
  </div>
);

export default Loader;
