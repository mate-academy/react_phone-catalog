import React from 'react';
import './NoResults.scss';

type Props = {
  categoryName: string;
};

export const NoResults: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="no-results">
      <h1 className="no-results__title">Sorry. {categoryName} not found</h1>
      <p className="no-results__text">Please, choose another category.</p>
    </div>
  );
};
