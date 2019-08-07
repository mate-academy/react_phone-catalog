import React from 'react';
import { Link } from 'react-router-dom';

const PhoneCatalog = ({phones}) => (
    <ul className="phones-info">
      {phones.map(phone => (
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
      ))}
    </ul>
);

export default PhoneCatalog;
