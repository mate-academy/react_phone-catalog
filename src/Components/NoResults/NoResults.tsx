import React from 'react';
import './NoResults.scss';

type Props = {
  category: string
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <div className="container">
    <div className="NoResults page__section">
      <h1 className="title">{`${category} will appear soon...`}</h1>
    </div>
  </div>
);
