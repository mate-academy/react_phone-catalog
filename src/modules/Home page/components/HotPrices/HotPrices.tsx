import React, { useEffect, useState } from 'react';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import './HotPrices.scss';
import classNames from 'classnames';
import { PhoneType } from '../../../../types/PhoneType';

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateTranslateX = (index: number) => {
    if (screenWidth < 639) {
      return index * 65;
    } else if (screenWidth >= 639 && screenWidth < 1199) {
      return index * 55;
    } else {
      return index * 25;
    }
  };

  const translateX = updateTranslateX(imageIndex);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => response.json())
      .then(data => setPhones(data.slice(0, 8)));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function showNextImage() {
    setImageIndex(index => {
      if (index === 4) {
        return 0;
      }

      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) {
        return phones.length - 1;
      }

      return index - 1;
    });
  }

  return (
    <section className="phone container">
      <div className="phone__top">
        <h1 className="phone__title">Hot prices</h1>
        <div className="phone__slide">
          <div
            className={classNames('phone__slide--left', {
              'phone__disabled': translateX === 0
            })}
            onClick={showPrevImage}
          >
            <img
              src="../../../img/slider/svg/chevron (arrow left).svg"
              alt="left"
            />
          </div>
          <div className="phone__slide--right" onClick={showNextImage}>
            <img
              src="../../../img/slider/svg/chevron (arrow right).svg"
              alt="right"
            />
          </div>
        </div>
      </div>

      <div className="phone__viewport">
        <div
          className="phone__grid"
          style={{ transform: `translateX(-${translateX}%)` }}
        >
          {phones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} isHot={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
