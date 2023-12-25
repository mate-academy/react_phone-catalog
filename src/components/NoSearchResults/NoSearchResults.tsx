import React from 'react';

type Props = {
  category: string,
};

export const NoSearchResults: React.FC<Props> = ({ category }) => (
  <section>
    <h1>{`There are no ${category} here that matching your criteria`}</h1>
  </section>
);
