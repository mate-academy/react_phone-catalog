import styles from './NewModels.module.scss';

import data from '../../../public/api/products.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export const NewModels = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleCart = (productId: number) => {
    setCart(prevCart =>
      prevCart.includes(productId)
        ? prevCart.filter(id => id !== productId)
        : [...prevCart, productId],
    );
  };

  const toggleFavorites = (productId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId],
    );
  };

  const getNewestProducts = (products: Product[]): Product[] => {
    const maxYear = Math.max(...products.map(p => p.year));

    return products.filter(p => p.year === maxYear);
  };

  const newestPhones = getNewestProducts(data).sort(
    (a, b) => b.price - a.price,
  );

  return (
    <div className={styles.section__wrapper}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>Brand new models</h2>

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
        {newestPhones.map(product => {
          const isAddedToCart = cart.includes(product.id);
          const isFavorite = favorites.includes(product.id);

          return (
            <SwiperSlide key={product.id}>
              <article className={styles.productCard}>
                <a href="" className={styles.productCard__link}>
                  <img
                    src={product.image}
                    alt="Product Image"
                    className={styles.productCard__img}
                  />
                </a>

                <div className={styles.productCard__body}>
                  <a href="" className={styles.productCard__title}>
                    {product.name}
                  </a>
                  <div className={styles.productCard__price}>
                    ${product.price}
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
