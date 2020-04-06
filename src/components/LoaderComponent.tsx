import React from 'react';
import Loader from 'react-loader-spinner';

export const LoaderComponent = () => (
  <div className="loader__wrapper">
    <Loader
      type="ThreeDots"
      color="#000"
      height={100}
      width={100}
    />
  </div>
);
