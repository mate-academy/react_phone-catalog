import React from 'react';

import './NoResults.scss';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <div className="NoResults">
    <h1 className="NoResults__title">{`${category} not found`}</h1>
  </div>
);
