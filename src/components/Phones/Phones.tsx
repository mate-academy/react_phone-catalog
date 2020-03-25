import React from 'react';
import './_Phones.scss';
import { PhoneCatalog } from '../PhoneCatalog/PhoneCatalog';

export const Phones = () => (
  <main className="main">
    <section className="phones">
      <div className="phones__wrapper">
        <div className="phones__top-location">
          <span className="phones__home-logo" />
          <p className="phones__location">Phones</p>
        </div>
        <div className="phones__main-info">
          <h3 className="phones__title">Mobile phones</h3>
          <span className="phones__number">number models</span>
        </div>
        <PhoneCatalog />
      </div>
    </section>
  </main>
);
