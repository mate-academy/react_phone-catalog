import { FC } from 'react';

export const NoSearchResult: FC = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <div className="no-result">
      <h2 className="no-results__message">
        There are no products matching the query &#x1F50D;
      </h2>

      <div className="no-results__image-container">
        <img
          src="img/noSearchResult.jpg"
          alt="No results"
          className="no-results__image"
        />
      </div>
    </div>
  );
};
