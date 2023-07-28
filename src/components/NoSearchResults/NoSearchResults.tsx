import React from 'react';
import './noSearchResults.scss';

export const NoSearchResults:React.FC = () => {
  return (
    <div className="no-results">
      <h2 className="no-results__title">
        There are no products matching your request
      </h2>
    </div>
  );
};
