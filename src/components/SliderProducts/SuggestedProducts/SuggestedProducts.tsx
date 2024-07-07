import React, { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../../services/getSuggestedProducts';
import { Gadget } from '../../../types/Gadget';
import './SuggestedProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

export const SuggestedProducts: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Gadget[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const products = await getSuggestedProducts();

      setSuggestedProducts(products);
    };

    fetchSuggestedProducts();
  }, []);

  const addToFav = () => {
    setIsPressed(!isPressed);
  };

  return (
    <>
      <div className="recommended__header">
        <h3 className="recommended__header--title">You may also like</h3>
        <div className="recommended__header--buttons swiper-button">
          <button className="swiper-button-left"></button>
          <button className="swiper-button-right"></button>
        </div>
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.5}
        className="recommended__list"
      >
        {suggestedProducts.map(product => (
          <SwiperSlide
            key={product.id}
            className="recommended__list--card recomm-card"
          >
            <div className="recomm-card__picture">
              <img
                className="recomm-card__picture--img"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h4 className="recomm-card__title">{product.name}</h4>
            <div className="recomm-card__price">
              <p className="recomm-card__price--disc">{product.price}</p>
              <p className="recomm-card__price--regular">{product.fullPrice}</p>
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
              <button type="button" className="recomm-card__buttons--add">
                Add to cart
              </button>
              <button
                className="recomm-card__buttons--heart"
                onClick={addToFav}
              >
                <svg
                  className={classNames('icon icon-heart', {
                    'icon-heart-red': isPressed,
                  })}
                >
                  <use href="/img/icons.svg#icon-favourites-filled"></use>
                </svg>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
