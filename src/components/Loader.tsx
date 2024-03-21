/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

import '../styles/Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <TailSpin
        visible={true}
        height="60"
        width="60"
        color="#89939a"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
