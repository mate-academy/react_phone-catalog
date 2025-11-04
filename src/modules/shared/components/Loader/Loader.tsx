import React from 'react';
import './Loader.scss';

type LoaderProps = {};

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="loader">
      <ul className="loader__content">
        <li className="loader__item">L</li>
        <li className="loader__item">O</li>
        <li className="loader__item">A</li>
        <li className="loader__item">D</li>
        <li className="loader__item">I</li>
        <li className="loader__item">N</li>
        <li className="loader__item">G</li>
        <li className="loader__item">.</li>
        <li className="loader__item">.</li>
        <li className="loader__item">.</li>
      </ul>
    </div>
  );
};
