import { FC } from 'react';
import '../NoResults/NoResults.scss';

export const NoSearchResults: FC = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <div className="no-results">
      <h2 className="no-results__message">
        There are no products matching the query &#x1F50D;
      </h2>

      <div className="no-results__image-container">
        <img
          src="/new/img/No_search_results.jpg"
          alt="No results"
          className="no-results__image"
        />
      </div>
    </div>
  );
};
