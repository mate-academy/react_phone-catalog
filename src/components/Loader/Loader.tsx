import React from 'react';
import './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);
