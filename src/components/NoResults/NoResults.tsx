import React from 'react';
import './NoResults.scss';

type Props = {
  categoryName: string,
};

export const NoResults: React.FC<Props> = ({ categoryName }) => (
  <p className="NoResults">{`${categoryName} not found`}</p>
);
