import React from 'react';

interface Props {
  name: string
}

export const NoResults: React.FC<Props> = ({ name }) => {
  return (
    <h1>
      {`${name} not found`}
    </h1>
  );
};
