import React from 'react';

type Props = {
  title: string,
};

export const NoResults: React.FC<Props> = ({ title }) => {
  return (
    <h2>
      {title}
      {' '}
      not found
    </h2>
  );
};
