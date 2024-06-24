import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image"></div>
      <div className="loader__text">Loading....</div>
    </div>
  );
};

export default Loader;
