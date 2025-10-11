// import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import styles from './ProductSlider.module.scss';
import { ProductSliderInterface } from '../../types/ProductSliderInterface';
import { Link } from 'react-router-dom';

export const ProductSlider: React.FC<ProductSliderInterface> = ({
  title,
  showOldPrice = false,
  limit = 10,
  products = [],
}) => {
  const itemsToShow = limit ? products.slice(0, limit) : products;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles['card__slider-buttons']}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`} disabled />
          <button className={`${styles.navBtn} ${styles.nextBtn}`} />
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${styles.prevBtn}`,
          nextEl: `.${styles.nextBtn}`,
        }}
        centeredSlides={false}
        // slidesOffsetAfter={8}
        // slidesOffsetBefore={8}
        // spaceBetween={16}
        // slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 8 },
          768: { slidesPerView: 2.5, spaceBetween: 16 },
          1200: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {itemsToShow.map(product => (
          <SwiperSlide key={product.id}>
            <article className={styles.card} data-qa="card">
              <div className={styles.card__top}>
                <Link to={`/${product.category}/${product.id}`}>
                  <img
                    src={`/${product.images[0]}`}
                    alt={product.name}
                    className={styles.card__image}
                  />
                </Link>
              </div>

              <h2 className={styles.card__name}>
                <Link to={`/${product.category}/${product.id}`}>
                  {product.name}
                </Link>
              </h2>

              <div className={styles.card__prices}>
                <span className={styles.card__fullPrice}>
                  ${product.priceRegular}
                </span>
                {showOldPrice && (
                  <span className={styles.card__price}>
                    ${product.priceDiscount}
                  </span>
                )}
              </div>

              <p className={styles.card__settings}>
                <span className={styles['card__settings-name']}>Screen</span>
                <span className={styles['card__settings-value']}>
                  {product.screen}
                </span>

                <span className={styles['card__settings-name']}>Capacity</span>
                <span className={styles['card__settings-value']}>
                  {product.capacity}
                </span>

                <span className={styles['card__settings-name']}>RAM</span>
                <span className={styles['card__settings-value']}>
                  {product.ram}
                </span>
              </p>

              <div className={styles.card__buttons}>
                <a
                  href="#buy"
                  className={styles['card__buttons-cart']}
                  data-qa="hover"
                >
                  Add to cart
                </a>

                <a href="#" className={styles['card__buttons-fav']}>
                  <img src="./img/icons/fav.png" alt="favourite goods" />
                </a>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
