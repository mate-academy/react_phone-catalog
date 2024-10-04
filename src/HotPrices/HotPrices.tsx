/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState } from 'react';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './HotPrices.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

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

  while (productsWithMaxDiscount.length < 4) {
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
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + productsPerPage < productsWithMaxDiscount.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  return (
    <div className={styles.productList}>
      <h1>Hot Prices</h1>
      <div className={styles.buttonsGroup}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={styles.buttons_controls}
        >
          <img src="img/Arrow-left.png" alt="Previous" />
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentIndex + productsPerPage >= productsWithMaxDiscount.length
          }
          className={styles.buttons_controls}
        >
          <img src="img/Arrow-right.png" alt="Next" />
        </button>
      </div>

      <div className={styles.productGrid}>
        {productsWithMaxDiscount.map(product => (
          <Link
            to={`/product/${product?.id}`}
            key={product?.id}
            className={styles.linkProduct}
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
        ))}
      </div>
    </div>
  );
};
