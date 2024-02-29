import React from 'react';
import './SmallLoader.scss';

export const SmallLoader: React.FC = () => {
  return (
    <div className="SmallLoader" data-cy="loader">
      <div className="SmallLoader__content" />
    </div>
  );
};
