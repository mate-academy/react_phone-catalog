import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
const PhoneCatalog = ({ phones, onAddToBasket }) => (
  <div>
    {phones.map((phone) => {
      const {
        id, name, imageUrl, snippet,
      } = phone;

      return (
        <div key={id} className="catalog__card card">
          <div className="card__image image-container">
            <Link to={`/phones/${id}`}>
              <img
                /* eslint-disable-next-line max-len */
                src={`https://mate-academy.github.io/phone-catalogue-static/${imageUrl}`}
                alt={name}
              />
            </Link>
          </div>

          <div className="card__description">
            <Link to={`/phones/${id}`}>
              <h3 className="indent-mb-sm">{name}</h3>
            </Link>
            <p>{snippet}</p>
          </div>
          <div className="card__button">
            <button
              type="button"
              onClick={() => onAddToBasket(id, name)}
            >
            Add
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

export default React.memo(PhoneCatalog);
