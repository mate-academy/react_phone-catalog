import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PhoneDetailsPage from './PhoneDetailsPage';

const PhoneCatalog = ({ phones, phoneId }) => {
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
            <div className="phones-catalog__item">
              <div className="phones-catalog__item-img">
                <img src={`img/phones/${phoneItem.id}.0.jpg`} alt="phone" />
              </div>
              <article className="phones-catalog__item-description">
                <NavLink
                  to={`/phones-catalog/${phoneItem.id}`}
                  className="item-description--name"
                >
                  {phoneItem.name}
                </NavLink>
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
  phoneId: propTypes.string.isRequired,
};

export default PhoneCatalog;
