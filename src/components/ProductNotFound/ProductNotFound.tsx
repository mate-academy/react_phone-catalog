import React from 'react';

type Props = {
  category: string,
};

export const ProductNotFound: React.FC<Props> = ({ category }) => {
  return (
    <h1>{`${category} was not found`}</h1>
  );
};
