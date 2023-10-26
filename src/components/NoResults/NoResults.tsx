import React from 'react';

type Props = {
  title: string;
};

export const NoResults: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="noResults-title">
      {`${title} not found`}
    </h1>
  );
};
