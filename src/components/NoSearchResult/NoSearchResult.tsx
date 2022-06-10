import React from 'react';
import './NoSearchResult.scss';

export const NoSearchResult = React.memo(() => (
  <div className="no-search-result">
    <h3 className="no-search-result__title">
      There are no products matching the query
    </h3>
  </div>
));
