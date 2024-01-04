import React from 'react';
import './NoSearchResults.scss';
import noResult from '../../assets/no-data.jpg';

export const NoSearchResults: React.FC = () => {
  return (
    <div className="no-search-results">
      <p>No search results.</p>
      <img src={noResult} alt="no-result" />
    </div>
  );
};
