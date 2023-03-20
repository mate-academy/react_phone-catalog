import React from 'react';
import './notFound.scss';

export const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__num">
        404
      </div>
      <div className="not-found__text">
        Page not found
      </div>
    </div>
  );
};
