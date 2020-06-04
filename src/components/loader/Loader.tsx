import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="spinner-position">
      <h2>Loading content, please, wait!</h2>
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
