import React, { FC, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import './_PhoneCatalog.scss';
import axios from 'axios';
import { URL } from '../../constants/api';
import { Phone } from '../../constants/types';
import { PhoneThumb } from '../PhoneThumb/PhoneThunb';
import { PhoneDetaisPage } from '../PhoneDetailsPage/PhoneDetailsPage';

export const PhoneCatalog: FC
= () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    axios.get(URL).then(res => setPhones(res.data));
  }, []);

  return (
    <>
      <Route
        path="/phone/:phoneId?"
        render={() => (
          <PhoneDetaisPage />
        )}
      />
      <ul className="phoneCatalog">
        {phones.map(phone => (
          <li className="phoneCatalog__item" key={phone.id}>
            <Link to={`/phones/${phone.id}`}>
              <PhoneThumb data={phone} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
