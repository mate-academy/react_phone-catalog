import React from 'react';
import './NoResults.scss';

type Props = {
  categoryName: string,
};

export const NoResults: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="NoResults">
      <h1 className="NoResults__title">
        {`${categoryName} not found`}
      </h1>
    </div>
  );
};
