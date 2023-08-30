import noResults from '../../images/noResults.png';

export const NoSearchResults = () => (
  <main className="main">
    <section className="main__no-results">
      <h1 className="main__title main__title--development">
        Sorry! No results found yet...
      </h1>
      <img
        src={noResults}
        alt="No results"
        className="main__no-results-image"
      />
    </section>
  </main>
);
