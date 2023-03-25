import './noSearchResult.scss';

export const NoSearchResult = () => {
  return (
    <section className="no-search-result">
      <p className="no-search-result__message">
        No Search Result
      </p>

      <p className="no-search-result__description">
        We can&apos;t find any item matching your search.
      </p>
    </section>
  );
};
