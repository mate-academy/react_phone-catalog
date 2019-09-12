import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

const PhoneCatalog = ({ match, phones, onAddToBasket }) => (
  <div className="catalog fix-container2 indent-mb-l">
    {phones.map((phone, idx) => {
      const {
        id, name, imageUrl, snippet,
      } = phone;

      return (
        <div
          key={id}
          className="catalog__card card"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="card__image image-container indent-mb-sm">
            <Link to={`${match.url}${id}`}>
              <img
                /* eslint-disable-next-line max-len */
                src={`https://mate-academy.github.io/phone-catalogue-static/${imageUrl}`}
                alt={name}
              />
            </Link>
          </div>
          <div className="card__description indent-mb-sm">
            <Link to={`${match.url}${id}`}>
              <h3 className="indent-mb-sm">{name}</h3>
            </Link>
            <p>{snippet}</p>
          </div>
          <div className="card__button">
            <button
              type="button"
              onClick={() => onAddToBasket(id, name)}
            >
              BUY
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

PhoneCatalog.propTypes = {
  phones: PropTypes.instanceOf(Array).isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(PhoneCatalog);
