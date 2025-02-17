import React, { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../../services/getSuggestedProducts';
import { Gadget } from '../../../types/Gadget';
import './SuggestedProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ButtonAddCart } from '../../ButtonAddCart';
import { ButtonHeart } from '../../ButtonHeart';
import { Link } from 'react-router-dom';

export const SuggestedProducts: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Gadget[]>([]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const products = await getSuggestedProducts();

      setSuggestedProducts(products);
    };

    fetchSuggestedProducts();
  }, []);

  return (
    <>
      <div className="recommended__header">
        <h3 className="recommended__header--title">You may also like</h3>
        <div className="recommended__header--buttons swiper-btn">
          <button className="swiper-btn__prev">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </button>
          <button className="swiper-btn__next">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.5}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        speed={1000}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 16,
            loop: false,
          },

          450: {
            slidesPerView: 2,
            spaceBetween: 16,
            loop: false,
          },

          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
            loop: false,
          },

          800: {
            slidesPerView: 3,
            spaceBetween: 16,
            loop: false,
          },

          1000: {
            slidesPerView: 3.5,
            spaceBetween: 16,
            loop: false,
          },

          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: false,
          },
        }}
        navigation={{
          nextEl: '.swiper-btn__next',
          prevEl: '.swiper-btn__prev',
        }}
        className="recommended__list"
      >
        {suggestedProducts.map(product => (
          <SwiperSlide
            key={product.id}
            className="recommended__list--card recomm-card"
          >
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="recomm-card__picture"
            >
              <img
                className="recomm-card__picture--img"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="recomm-card__title"
            >
              {product.name}
            </Link>
            <div className="recomm-card__price">
              <p className="recomm-card__price--disc">{`$${product.price}`}</p>
              <p className="recomm-card__price--regular">{`$${product.fullPrice}`}</p>
            </div>
            <ul className="recomm-card__tech">
              <li className="recomm-card__tech--item recomm-item">
                <p className="recomm-item__name">Screen</p>
                <p className="recomm-item__param">{product.screen}</p>
              </li>
              <li className="recomm-card__tech--item recomm-item">
                <p className="recomm-item__name">Capacity</p>
                <p className="recomm-item__param">{product.capacity}</p>
              </li>
              <li className="recomm-card__tech--item recomm-item">
                <p className="recomm-item__name">RAM</p>
                <p className="recomm-item__param">{product.ram}</p>
              </li>
            </ul>
            <div className="recomm-card__buttons">
              <ButtonAddCart productId={product.itemId} />
              <ButtonHeart productId={product.itemId} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
