import React from 'react';
import noResults from '../../images/noResults.png';

export const Error: React.FC = () => (
  <main className="main">
    <section className="main__no-results">
      <h1 className="main__title main__title--development">
        Sorry, something went wrong. Please try again later.
      </h1>
      <img
        src={noResults}
        alt="No results"
        className="main__no-results-image"
      />
    </section>
  </main>
);
