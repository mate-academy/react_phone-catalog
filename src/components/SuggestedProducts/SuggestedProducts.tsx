import styles from './SuggestedProducts.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useEffect, useState } from 'react';
import { Product } from '../../modules/shared/types/Product';
import { getSuggestedProducts } from '../../modules/shared/api/products';
import { Link } from 'react-router-dom';
import { useCart } from '../../modules/shared/contexts/CartContext';
import { useFavorites } from '../../modules/shared/contexts/FavoritesContext';

type Props = {
  category: string;
  excludeId: number;
};

export const SuggestedProducts: React.FC<Props> = ({ category, excludeId }) => {
  const { isInCart, addToCart } = useCart();
  const { favorites, toggleFavorites } = useFavorites();
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts(category, excludeId)
      .then(setSuggested)
      .catch(() => setSuggested([]));
  }, [category, excludeId]);

  if (suggested.length === 0) {
    return null;
  }

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
        {suggested.map(product => {
          const isAddedToCart = isInCart(product.id);
          const isFavorite = favorites.includes(product.id);

          return (
            <SwiperSlide key={product.id}>
              <article className={styles.suggestedCard}>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.suggestedCard__link}
                >
                  <img
                    src={product.image}
                    alt="Product Image"
                    className={styles.suggestedCard__img}
                  />
                </Link>

                <div className={styles.suggestedCard__body}>
                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.suggestedCard__title}
                  >
                    {product.name}
                  </Link>
                  <div className={styles.suggestedCard__price}>
                    <span>${product.price}</span>
                    <span className={styles.suggestedCard__discount}>
                      ${product.fullPrice}
                    </span>
                  </div>
                  <hr className={styles.suggestedCard__divider} />
                  <div className={styles.suggestedCard__description}>
                    <div className={styles.suggestedCard__item}>
                      <span className={styles.suggestedCard__property}>
                        Screen
                      </span>
                      <strong className={styles.suggestedCard__value}>
                        {product.screen}
                      </strong>
                    </div>
                    <div className={styles.suggestedCard__item}>
                      <span className={styles.suggestedCard__property}>
                        Capacity
                      </span>
                      <strong className={styles.suggestedCard__value}>
                        {product.capacity}
                      </strong>
                    </div>
                    <div className={styles.suggestedCard__item}>
                      <span className={styles.suggestedCard__property}>
                        RAM
                      </span>
                      <strong className={styles.suggestedCard__value}>
                        {product.ram}
                      </strong>
                    </div>
                  </div>
                  <div className={styles.suggestedCard__control}>
                    <button
                      className={`${styles.suggestedCard__addButton} ${isAddedToCart ? styles['suggestedCard__addButton--active'] : ''}`}
                      onClick={() => {
                        if (!isAddedToCart) {
                          addToCart(product);
                        }
                      }}
                    >
                      {isAddedToCart ? 'Added' : 'Add to cart'}
                    </button>
                    <button
                      className={`${styles.suggestedCard__favoriteButton} ${isFavorite ? styles['suggestedCard__favoriteButton--active'] : ''}`}
                      onClick={() => toggleFavorites(product.id)}
                    >
                      {isFavorite ? (
                        <img
                          src="img/icons/favorite-filled.png"
                          alt="Added to Favorites"
                          className={styles.suggestedCard__favoriteIcon}
                        />
                      ) : (
                        <img
                          src="img/icons/favorite.png"
                          alt="Add to Favorites"
                          className={styles.suggestedCard__favoriteIcon}
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
