import noResults from '../../image/no-result-512.png';

export const Error = () => (
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
