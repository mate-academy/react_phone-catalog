import React from 'react';

export const PageInfo = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => (
  <div className="page__info">
    <h1>{title}</h1>
    <p className="body-text page__info-count">{count} items</p>
  </div>
);
