/* eslint-disable @typescript-eslint/no-shadow */
import React, { useRef, useState, useEffect } from 'react';
import './ProductsSlider.scss';
import { Carusel } from '../Carusel/Carusel';
import { Product } from '../../types/Product';
import { SwiperClass } from 'swiper/react';

type Props = {
  phones: Product[];
};

export const HotPrices: React.FC<Props> = ({ phones }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  function sortPhonesByModel(phones: Product[]) {
    return phones.sort((a, b) => b.fullPrice - a.fullPrice);
  }

  const sortedPhones = sortPhonesByModel(phones).slice(0, 20);

  useEffect(() => {
    const swiperInstance = swiperRef.current;

    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      swiperInstance.on('slideChange', () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, []);

  return (
    <div className="carusel">
      <div className="carusel__container__head">
        <h2>Hot prices</h2>
        <div className="carusel__buttons">
          <button
            className={`carusel__button carusel__button--prev ${isBeginning ? 'carusel__button--disabled' : ''}`}
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          ></button>
          <button
            className={`carusel__button carusel__button--next ${isEnd ? 'carusel__button--disabled' : ''}`}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          ></button>
        </div>
      </div>
      <Carusel products={sortedPhones} swiperRef={swiperRef} />
    </div>
  );
};
