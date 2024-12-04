import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CartContext, FavoritesContext } from './AppProvaider';
import FavoriteAdd from '../img/Favorite-add.svg';
import FavoriteAddActive from '../img/Favorite-add-active.svg';
import 'swiper/css/pagination';
import './BrandNewModelsSlider.scss';
import { useContext } from 'react';
import { CartContextType, FavoritesContextType, Product } from './types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  phones: Product[];
  name: string;
};

export const BrandNewModelsSlider: React.FC<Props> = ({ phones, name }) => {
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);
  const cartContext = useContext<CartContextType>(CartContext);
  const { addToCart, removeFromCart, cartInclude } = cartContext;

  const { addToFavorites, removeFromFavorites, favoritesInclude } =
    favoritesContext;

  return (
    <div className="brand-new-slider grid-container">
      <h2 className="slider-h2">
        {name}
        <div className="custom-swiper-buttons">
          <button className="custom-el custom-el__prev"></button>
          <button className="custom-el custom-el__next"></button>
        </div>
      </h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={{
          nextEl: '.custom-el__next', // Указываем кастомный класс для кнопки "вперёд"
          prevEl: '.custom-el__prev', // Указываем кастомный класс для кнопки "назад"
        }}
        spaceBetween={0}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        loop
        className="swiper-container"
      >
        {phones.map(product => (
          <SwiperSlide key={product.id}>
            <div className="card" key={product.id}>
              <div className="card__content">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="card__img"
                    src={product.images[0]}
                    alt={product.id}
                  />
                </Link>
                <div className="card__main-text">{product.name}</div>
                <div className="card__price">
                  <div className="card__price__discount">
                    {`$${product.priceDiscount}`}
                  </div>
                  <div className="card__price__regular">{`$${product.priceRegular}`}</div>
                </div>
                <div className="card__specs">
                  <div className="card__specs__string">
                    Screen
                    <div className="card__specs__string__value">
                      {product.screen}
                    </div>
                  </div>
                  <div className="card__specs__string">
                    Capacity
                    <div className="card__specs__string__value">
                      {product.capacity}
                    </div>
                  </div>
                  <div className="card__specs__string">
                    RAM
                    <div className="card__specs__string__value">
                      {product.ram}
                    </div>
                  </div>
                </div>
                <div className="card__buttons">
                  <button
                    className={classNames('card__buttons__add button__add', {
                      button__add__active: cartInclude(product),
                    })}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      cartInclude(product)
                        ? removeFromCart(product)
                        : addToCart(product);
                    }}
                  >
                    {cartInclude(product) ? 'Remove from cart' : 'Add to cart'}
                  </button>
                  <img
                    className="card__buttons__favorite button__favorite"
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      favoritesInclude(product)
                        ? removeFromFavorites(product.id)
                        : addToFavorites(product);
                    }}
                    src={
                      favoritesInclude(product)
                        ? FavoriteAddActive
                        : FavoriteAdd
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
