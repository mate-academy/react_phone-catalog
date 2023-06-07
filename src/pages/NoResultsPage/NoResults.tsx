import './NoResults.scss';
import noResults from '../../Icons/noResults.png';

export const NoResults = () => {
  return (
    <div className="no-results">
      <img src={noResults} alt="" />

      <h1 className="no-results__title">
        Sorry! No results found
        {' '}
        :(
      </h1>

      <p className="error__desc">
        Maybe you want to go back to
        <a href="/" className="error__link"> Home page </a>
        ?
      </p>
    </div>
  );
};
