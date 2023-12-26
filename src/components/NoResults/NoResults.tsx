import React from 'react';
import './NoResults.scss';

type Props = {
  title: string,
};

export const NoResults: React.FC<Props> = ({
  title = 'NoResults',
}) => (
  <div className="NoResults NoResults__container">
    <h1 className="NoResults__title">{title}</h1>
  </div>
);
