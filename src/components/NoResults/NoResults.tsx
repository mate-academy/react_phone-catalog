/* eslint-disable global-require */
import './NoResults.scss';

const image = [require('../../assets/others/try-another.png')];

export const NoResults = () => {
  return (
    <div className="no-results">
      <img src={image[0]} alt=" " className="no-results__image" />

      <div className="no-results__content">
        <h1 className="title">No products found</h1>
        <p className="no-results__message">
          Sorry, nothing was found for your search. Try another way.
        </p>
      </div>
    </div>
  );
};
