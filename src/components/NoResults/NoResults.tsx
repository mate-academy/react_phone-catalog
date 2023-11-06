import React from 'react';
import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => {
  return (
    <span className="NoResults">
      {`${category} not found`}
    </span>
  );
};
