import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <span className="loader__spinner" />
    </div>
  );
};
