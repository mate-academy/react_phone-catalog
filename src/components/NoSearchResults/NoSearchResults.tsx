import noresult from '../../image/not_found.jpg';

export const NoSearchResults = () => (
  <main className="main">
    <section className="main__no-results">
      <h1 className="main__title main__title--development">
        We are sorry, but this feature is not implemented yet
      </h1>
      <img
        src={noresult}
        alt="No results"
        className="main__no-results-image"
      />
    </section>
  </main>
);
