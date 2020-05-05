import React, { FC, useState, useEffect, useMemo, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { URL_PHONE } from '../constants/api';
import { filterPhones } from '../helper';

import '../Style/card.scss';

export const Phonescatalog: FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetch(URL_PHONE)
      .then(async data => setPhones(await data.json()));
  }, []);

  const phonesShow = useMemo(() => {
    if (!phones.length) {
      return [];
    }

    return filterPhones(query, phones);
  }, [query, phones]);

  return (
    <main className="main">
      <section className="wrapper">

        <div className="route-page">
          <Link to="/">
            <img
              src="./img/svg/home.svg"
              className="route-page__home"
              alt="icon home"
            />
          </Link>
          <img
            src="./img/svg/rowleft.svg"
            className="route-page__arrow"
            alt="icon left"
          />

          <span className="route-page__current">Phones</span>
        </div>

        <h1 className="card-title">Mobile phones</h1>

        <p className="phones-quantity">
          {phones.length}
          {' '}
          models
        </p>

        <div className="sorted-box">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="sorted-box__search"
            placeholder="Search phone..."
          />
        </div>

        <div className="card-box">
          {phonesShow.map(phone => (
            <article key={phone.id} className="card">
              <img className="card__img" src={phone.imageUrl} alt="img-tell" />
              <h3 className="card__title">
                {phone.name}
              </h3>
              <p className="card__snippet">
                {phone.snippet}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
