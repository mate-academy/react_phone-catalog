import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PhoneDetailsPage from './PhoneDetailsPage';

const PhoneCatalog = ({ phones, match }) => {
  const phoneId = match.params.id;
  const phone = phones.find(phoneItem => phoneItem.id === phoneId);

  if (phoneId && !phone) {
    return (
      <h2>Error! These phone was not found</h2>
    );
  }

  return (
    <main className="phones-catalog">
      {
        phoneId
          ? <PhoneDetailsPage phone={phone} />
          : phones.map(phoneItem => (
            <div className="phones-catalog__item" key={phoneItem.id}>
              <div className="phones-catalog__item-img">
                <img src={`img/phones/${phoneItem.id}.0.jpg`} alt="phone" />
              </div>
              <article className="phones-catalog__item-description">
                <Link
                  to={`/phones-catalog/${phoneItem.id}`}
                  className="item-description--name"
                >
                  {phoneItem.name}
                </Link>
                <p>{phoneItem.snippet}</p>
              </article>
            </div>
          ))
      }
    </main>
  );
};

PhoneCatalog.propTypes = {
  phones: propTypes.shape().isRequired,
  match: propTypes.objectOf.isRequired,
};

export default PhoneCatalog;
