import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img className="loader__logo" src="./img/logo.png" alt="logo image" />
      <span className="loader__spinner" />
    </div>
  );
};
