import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
    </div>
  );
};
