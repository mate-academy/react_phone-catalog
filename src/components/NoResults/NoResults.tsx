import React from 'react';

type Props = {
  pathname: string;
};
export const NoResults: React.FC<Props> = ({ pathname }) => (
  <div className="container">
    <h1 className="title">
      {`${pathname.charAt(1).toUpperCase() + pathname.slice(2)} not found`}
    </h1>
  </div>
);
