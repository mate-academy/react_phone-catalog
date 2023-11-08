import React from 'react';

type Props = {
  type: string;
};

export const NoResults: React.FC<Props> = ({ type }) => {
  const prepearedTitle = type[0].toUpperCase() + type.slice(1);

  return (
    <h1 className="page__title">{`${prepearedTitle} not found`}</h1>
  );
};
