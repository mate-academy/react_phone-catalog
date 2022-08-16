import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className="Loader">
    <div className="Loader__circle">
      <div className="Loader__loading" />

      <div className="Loader__center" />
    </div>
  </div>
);
