/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './HotPrices.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export const HotPrices: React.FC = () => {
  const allProducts = [...phones, ...tablets, ...accessories];

  const sortedProductsWithDiscount = allProducts
    .map(product => {
      const discount =
        product.priceRegular - (product.priceDiscount || product.priceRegular);

      return { ...product, discount };
    })
    .sort((a, b) => b.discount - a.discount);

  const maxDiscountPhones = sortedProductsWithDiscount.find(product =>
    phones.some(phone => phone.id === product.id),
  );
  const maxDiscountTablets = sortedProductsWithDiscount.find(product =>
    tablets.some(tablet => tablet.id === product.id),
  );
  const maxDiscountAccessories = sortedProductsWithDiscount.find(product =>
    accessories.some(accessory => accessory.id === product.id),
  );

  const productsWithMaxDiscount = [
    maxDiscountPhones,
    maxDiscountTablets,
    maxDiscountAccessories,
  ].filter(Boolean);

  while (productsWithMaxDiscount.length < 128) {
    const nextProduct = sortedProductsWithDiscount.find(
      product =>
        !productsWithMaxDiscount.some(item => item && item.id === product.id),
    );

    if (nextProduct) {
      productsWithMaxDiscount.push(nextProduct);
    } else {
      break;
    }
  }

  const { dispatch } = useCart();

  const handleAddToCart = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = allProducts.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  return (
    <div className={styles.product_list}>
      <div className={styles.controls}>
        <h1 className={styles.title}>Hot Prices</h1>
        <div className={styles.buttons_group}>
          <button className={`reviews-slider_prev ${styles.buttons_controls}`}>
            <img src="img/Arrow-left.png" alt="Next" />
          </button>
          <button className={`reviews-slider_next  ${styles.buttons_controls}`}>
            <img src="img/Arrow-right.png" alt="Next" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        navigation={{
          nextEl: '.reviews-slider_next',
          prevEl: '.reviews-slider_prev',
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className={styles.product_grid}
      >
        {productsWithMaxDiscount.map(product => (
          <SwiperSlide key={product.id}>
            <Link
              to={`/product/${product?.id}`}
              key={product?.id}
              className={styles.link_product}
            >
              <DiscountProductCard
                key={product?.id}
                id={product?.id}
                name={product?.name}
                price={product?.priceRegular}
                discountPrice={product?.priceDiscount}
                imageUrl={product?.images[0]}
                isFavorite={false}
                screen={product?.screen}
                capacity={product?.capacity}
                ram={product?.ram}
                onAddToCart={() => handleAddToCart(product?.id)}
                onToggleFavorite={() => handleToggleFavorite(product?.id)}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
