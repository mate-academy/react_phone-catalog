import React from 'react';
import preloader from '../../../assets/animations/Infinity-1.5s-200px.svg';
import './Preloader.scss';

export const Preloader = () => {
  return (
    <>
      <img
        src={preloader}
        alt="preloader"
        className="preloader"
      />
    </>
  );
};
