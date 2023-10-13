import React from 'react';
import './NoResults.scss';

type Props = {
  categoryName: string;
};

export const NoResults: React.FC<Props> = ({ categoryName }) => (
  <div className="no-results">
    <p className="no-results__text">
      {`${categoryName} not found`}
    </p>
  </div>
);
