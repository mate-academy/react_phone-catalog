import React from 'react';
import search from '../../images/icons/Search.svg';
import './NoSearchResults.scss';

export const NoSearchResults: React.FC = () => {
  return (
    <section className="NoSearchResults">
      <img
        src={search}
        alt="Search"
        className="NoSearchResults__image"
      />
      <h2 className="NoSearchResults__title">
        Oops, no results found
      </h2>
    </section>
  );
};
