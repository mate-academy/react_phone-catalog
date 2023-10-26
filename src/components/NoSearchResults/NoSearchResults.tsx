import React from 'react';

type Props = {
  query: string;
};

export const NoSearchResults: React.FC<Props> = ({ query }) => (
  <div className="noSearchResults">
    Unfortunately, we did not find a product called
    {' '}
    <em className="noSearchResults__query">{query}</em>
    .
    Please try again.
  </div>
);
