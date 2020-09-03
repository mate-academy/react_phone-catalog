import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <RingLoader />
    </div>
  );
};

export default Spinner;
