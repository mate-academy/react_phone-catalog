import React from 'react';

import NoSearchResultsIcon from '../../images/6134065.png';
import './NoSearchResults.scss';

export const NoSearchResults: React.FC = () => {
  return (
    <div className="NoSearchResults">
      <img
        src={NoSearchResultsIcon}
        alt="no results"
        className="NoSearchResults__image"
      />
      <h1 className="NoSearchResults__title">No search results</h1>
    </div>
  );
};
