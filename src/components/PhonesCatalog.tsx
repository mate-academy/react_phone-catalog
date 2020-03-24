import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { PHONES_URL } from '../api/constants';
import { Phone } from './Phone';

export const PhonesCatalog: FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch(PHONES_URL)
      .then(async data => setPhones(await data.json()));
  }, []);

  return (
    <ul className="phones__list">
      {phones.map(phone => (
        <li className="phones__item" key={phone.id}>
          <Link className="link" to={`/phones/${phone.id}`}>
            <Phone {...phone} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
