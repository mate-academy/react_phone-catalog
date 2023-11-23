import React from 'react';
import './NoResult.scss';

type Props = {
  title: string,
};

export const NoResult: React.FC<Props> = ({ title }) => (
  <div className="notFound">
    <h1 className="notFound__title">
      {`${title} not found`}
    </h1>
  </div>
);
