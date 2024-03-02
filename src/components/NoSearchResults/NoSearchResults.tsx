import React from 'react';
import './NoSearchResults.scss';

type Props = {
  searchText: string
};

export const NoSearchResults: React.FC<Props> = ({ searchText }) => {
  return (
    <div className="no-search-results">
      <h1 className="no-search-results__title">
        Sorry. No search results for &quot;
        {searchText}
        &quot;
      </h1>
      <p className="no-search-results__text">
        Please, change your search criteria and try again
      </p>
    </div>
  );
};
