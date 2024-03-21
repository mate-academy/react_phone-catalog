import React from 'react';

import './NoSearchResult.scss';

export const NoSearchResult: React.FC = () => {
  return (
    <div className="NoSearchResult">
      <h2 className="NoSearchResult__title">No results found</h2>
      <p className="NoSearchResult__info">Try another search term</p>
    </div>
  );
};
