import React from 'react';

type Props = {
  title: string;
};

export const NoResults: React.FC<Props> = ({ title }) => {
  return (
    <div className="no-results">
      {`${title} not found`}
    </div>
  );
};
