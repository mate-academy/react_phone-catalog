import './NoResults.scss';
import noResultsImage from '../../img/notFound.png';

export const NoResults = () => {
  return (
    <div className="noResults">
      <div className="noResults__image-container">
        <img
          src={noResultsImage}
          alt="not found"
        />
      </div>
      <h1 className="noResults__title">
        Sorry, we couldn&apos;t find any results
      </h1>
    </div>
  );
};
