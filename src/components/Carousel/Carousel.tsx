/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import './Carousel.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { carouselImages, categoriesPath } from '../../helpers/constants';

const Button = ({ type }: { type: string }) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={type === 'next'
        ? () => swiper.slideNext()
        : () => swiper.slidePrev()}
      type="button"
      className={cn('carousel__button', {
        'carousel__button--left': type === 'next',
        'carousel__button--right': type === 'prev',
      })}
      aria-label="move-slider"
    >
      <div className={cn('icon', {
        'icon-next': type === 'next',
        'icon-prev': type === 'prev',
      })}
      />
    </button>
  );
};

export const Carousel: React.FC = () => {
  return (
    <section className="carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation
        loop
        className="swiper-top"
        allowTouchMove={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <Button type="prev" />

        {carouselImages.map((image, index) => (
          <SwiperSlide key={image}>
            <Link to={`/${categoriesPath[index]}`}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="swiper__image image-top"
              />
            </Link>
          </SwiperSlide>
        ))}

        <Button type="next" />
      </Swiper>
    </section>
  );
};
