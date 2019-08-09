import React from 'react';
import { Link } from 'react-router-dom';

const PhoneCatalog = ({ phones, addToBasket }) => (
  <ul className="phones-info">
    {phones.map(phone => (
      <div className="phone-section">
        <li key={phone.id} className="phones">
          <section className="phones-content">
            <Link to={`/phones/${phone.id}`}>
              <img
                className="phones-image"
                src={phone.imageUrl}
                alt={phone.name}
              />
            </Link>

            <div className="phones-item">
              <p className="phones-name">
                <Link
                  className="phones-title"
                  to={`/phones/${phone.id}`}
                >
                  {phone.name}
                </Link>
              </p>
              <span>{phone.snippet}</span>
            </div>
          </section>
        </li>
        <div className="phone-cart-section">
          <Link
            onClick={addToBasket}
            className="phone-add-on-basket"
            name={phone.id}
            phoneName={phone.name}
          >
            Add To Cart
          </Link>
        </div>
      </div>
    ))}
  </ul>
);

export default PhoneCatalog;
