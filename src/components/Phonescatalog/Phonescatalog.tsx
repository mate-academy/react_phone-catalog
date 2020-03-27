import React, { FC, useState, useEffect, useMemo } from 'react';

import { URL_PHONE } from '../constants/api';

import '../Style/card.scss';

export const Phonescatalog: FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch(URL_PHONE)
      .then(async data => setPhones(await data.json()));
  }, []);

  const phonesShow = useMemo(() => {
    if (!phones.length) {
      return [];
    }

    return phones;
  }, [phones]);

  return (
    <main className="main">
      <section className="wrapper">
        <h1>Phones page))</h1>
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
