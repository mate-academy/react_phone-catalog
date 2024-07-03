import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './CardSliderStyle.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
// import { Pagination } from 'swiper/modules';
import Card from '../ui/Card/Card';
import { Navigation } from 'swiper/modules';
import { Product } from 'src/types/Product';
import { Randomiser } from '../ui/Randomiser/Randomiser';

interface Props {
  title: string;
  cards: Product[];
  type?: string;
}

const CardSlider: React.FC<Props> = ({ title, cards, type }) => {
  const prevButtonId = `prev-${Randomiser(1)}`;
  const nextButtonId = `next-${Randomiser(2)}`;

  return (
    <>
      <div className="home__slider-card--header container">
        <h2 className="home__slider-card--title">{title}</h2>
        <div className="home__slider-card-buttons">
          <button className="swiper-button-prev" id={prevButtonId}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
              className="swiper-button-prev__svg"
            >
              <path
                className="swiper-button-prev__path"
                fillRule="evenodd"
                clipRule="evenodd"
                d={
                  'M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 ' +
                  '1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 ' +
                  '5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 ' +
                  '0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 ' +
                  '0.268409 8.78896 0.528758 8.52861L4.05735 ' +
                  '5.00001L0.528758 1.47141C0.268409 1.21107 ' +
                  '0.268409 0.788955 0.528758 0.528606Z'
                }
              />
            </svg>
          </button>
          <button className="swiper-button-next" id={nextButtonId}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
              className="swiper-button-next__svg"
            >
              <path
                className="swiper-button-next__path"
                fillRule="evenodd"
                clipRule="evenodd"
                d={
                  'M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 ' +
                  '1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 ' +
                  '5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 ' +
                  '0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 ' +
                  '0.268409 8.78896 0.528758 8.52861L4.05735 ' +
                  '5.00001L0.528758 1.47141C0.268409 1.21107 0.268409' +
                  '0.788955 0.528758 0.528606Z'
                }
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="card__swiper--wrapper">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          autoHeight={false}
          navigation={{
            nextEl: `#${nextButtonId}`,
            prevEl: `#${prevButtonId}`,
          }}
          modules={[Navigation]}
          className="card__swiper"
        >
          {cards.map(elem => (
            <SwiperSlide key={elem.itemId} className="card__slide-wrapper">
              <Card data={elem} type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardSlider;
