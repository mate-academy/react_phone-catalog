import React from 'react';
import { Link } from 'react-router-dom';
import '../style/main.scss';
import { Dropdowns } from '../Components/Dropdowns';
import { Phone } from '../Type/Phone';
import { ProductCard } from '../Components/ProductCard';

type Props = {
  phones: Phone[],
};

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const preperaPhones = phones.slice(0, 10);

  return (
    <main>
      <div className="phones">
        <div className="breadcrumbs">
          <Link
            to="/"
            className="breadcrumbs__button breadcrumbs__icon"
          />
          <div className="breadcrumbs__arrow breadcrumbs__icon" />
          <p>
            Phones
          </p>
        </div>
        <div className="title">
          <h1>Mobile phones</h1>

          <p className="title__p">{`${phones.length} models`}</p>
        </div>
        <Dropdowns />
      </div>

      <div className="container--list phones__list">
        {preperaPhones.map(phone => (
          <ProductCard phone={phone} key={phone.id} />
        ))}
      </div>

      <div className="phones__button">
        <button
          type="button"
          aria-label="Mute volume"
          className="phones__button--right"
        />
        {preperaPhones.length}
        <button
          type="button"
          aria-label="Mute volume"
          className="phones__button--left"
        />
      </div>
    </main>
  );
};
