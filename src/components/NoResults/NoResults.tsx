import React from 'react';
import './NoResults.scss';

export const NoResult: React.FC = () => {
  return (
    <div className="noResult">
      <p className="noResult__text">
        No products on this section
      </p>
    </div>
  );
};
