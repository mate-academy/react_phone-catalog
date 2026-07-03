import styles from './HotPrices.module.scss';

import data from '../../../public/api/products.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React from 'react';
import { Product } from '../../modules/shared/types/Product';
import { Link } from 'react-router-dom';

type Props = {
  cart: number[];
  toggleCart: (id: number) => void;
  favorites: number[];
  toggleFavorites: (id: number) => void;
};

export const HotPrices: React.FC<Props> = ({
  cart,
  toggleCart,
  favorites,
  toggleFavorites,
}) => {
  function getHotPriceProducts(products: Product[]) {
    return [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }

  const hotProducts = getHotPriceProducts(data);

  return (
    <div className={styles.section__wrapper}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>Hot prices</h2>

        <div className={styles.navigationButtons}>
          <button className={`${styles.navButton} js-swiper-prev`}>
            <img src="img/icons/arrow-left.png" alt="Swiper Left" />
          </button>
          <button className={`${styles.navButton} js-swiper-next`}>
            <img src="img/icons/arrow-right.png" alt="Swiper Right" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.js-swiper-prev',
          nextEl: '.js-swiper-next',
        }}
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {hotProducts.map(product => {
          const isAddedToCart = cart.includes(product.id);
          const isFavorite = favorites.includes(product.id);

          return (
            <SwiperSlide key={product.id}>
              <article className={styles.productCard}>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.productCard__link}
                >
                  <img
                    src={product.image}
                    alt="Product Image"
                    className={styles.productCard__img}
                  />
                </Link>

                <div className={styles.productCard__body}>
                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.productCard__title}
                  >
                    {product.name}
                  </Link>
                  <div className={styles.productCard__price}>
                    <span>${product.price}</span>
                    <span className={styles.productCard__discount}>
                      ${product.fullPrice}
                    </span>
                  </div>
                  <hr className={styles.productCard__divider} />
                  <div className={styles.productCard__description}>
                    <div className={styles.productCard__item}>
                      <span className={styles.productCard__property}>
                        Screen
                      </span>
                      <strong className={styles.productCard__value}>
                        {product.screen}
                      </strong>
                    </div>
                    <div className={styles.productCard__item}>
                      <span className={styles.productCard__property}>
                        Capacity
                      </span>
                      <strong className={styles.productCard__value}>
                        {product.capacity}
                      </strong>
                    </div>
                    <div className={styles.productCard__item}>
                      <span className={styles.productCard__property}>RAM</span>
                      <strong className={styles.productCard__value}>
                        {product.ram}
                      </strong>
                    </div>
                  </div>
                  <div className={styles.productCard__control}>
                    <button
                      className={`${styles.productCard__addButton} ${isAddedToCart ? styles['productCard__addButton--active'] : ''}`}
                      onClick={() => toggleCart(product.id)}
                    >
                      {isAddedToCart ? 'Added' : 'Add to cart'}
                    </button>
                    <button
                      className={`${styles.productCard__favoriteButton} ${isFavorite ? styles['productCard__favoriteButton--active'] : ''}`}
                      onClick={() => toggleFavorites(product.id)}
                    >
                      {isFavorite ? (
                        <img
                          src="img/icons/favorite-filled.png"
                          alt="Added to Favorites"
                          className={styles.productCard__favoriteIcon}
                        />
                      ) : (
                        <img
                          src="img/icons/favorite.png"
                          alt="Add to Favorites"
                          className={styles.productCard__favoriteIcon}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
