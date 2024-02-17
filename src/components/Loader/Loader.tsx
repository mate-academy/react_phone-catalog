import React from 'react';
import { Triangle } from 'react-loader-spinner';

import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Triangle
        visible
        height="140"
        width="140"
        color="#313237"
        ariaLabel="triangle-loading"
      />
    </div>
  );
};
