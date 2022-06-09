import React from 'react';
import './Loader.scss';

export const Loader: React.FC = React.memo(
  () => (
    <div className="loader">
      <div className="loader__content" />
    </div>
  ),
);
