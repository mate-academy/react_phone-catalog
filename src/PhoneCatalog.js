import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PhoneCatalog = ({ phones, handlerAddToBasket }) => (
  <main className="phones-catalog">
    {
      phones.map(phoneItem => (
        <div className="phones-catalog__item" key={phoneItem.id}>
          <div className="phones-catalog__item-img">
            <img src={phoneItem.imageUrl} alt="phone" />
          </div>
          <article className="phones-catalog__item-description">
            <Link
              to={`/phone-catalog/${phoneItem.id}`}
              className="item-description--name"
            >
              {phoneItem.name}
            </Link>
            <p className="item-description--content">{phoneItem.snippet}</p>
            <button
              type="button"
              className="phones-catalog__item--add"
              onClick={() => handlerAddToBasket(phoneItem)}
              name={phoneItem.id}
            >
              Add to basket
            </button>
          </article>
        </div>
      ))
    }
  </main>
);

PhoneCatalog.propTypes = {
  phones: propTypes.shape().isRequired,
  handlerAddToBasket: propTypes.func.isRequired,
};

export default PhoneCatalog;
