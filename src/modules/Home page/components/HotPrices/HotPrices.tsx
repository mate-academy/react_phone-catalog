import React, { useEffect, useState } from 'react';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import './HotPrices.scss';

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setPhones(phones);
  }, [phones]);

  return (
    <section className="phone container">
      <div className="phone__top">
        <h1 className="phone__title">Hot prices</h1>
        <div className="phone__slide">
          <div className="phone__slide--left">
            <img
              src="../../../img/slider/svg/chevron (arrow left).svg"
              alt="left"
            />
          </div>
          <div className="phone__slide--right">
            <img
              src="../../../img/slider/svg/chevron (arrow right).svg"
              alt="right"
            />
          </div>
        </div>
      </div>

      {phones.map(phone => {
        return <PhoneCard key={phone} phone={phone} isHot={true} />;
      })}
    </section>
  );
};
