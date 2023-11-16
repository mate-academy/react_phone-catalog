import React from 'react';
import './NoResults.scss';

type Props = {
  categoryName: string,
};

export const NoResults: React.FC<Props> = ({ categoryName }) => (
  <p>{`${categoryName} not found`}</p>
);
