/* eslint-disable no-console */
import React from 'react';
import phones from '../../public/api/phones.json';
// eslint-disable-next-line max-len
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './HotPrices.module.scss';

export const HotPrices: React.FC = () => {
  const filteredProducts = phones.filter(
    phone =>
      (phone.namespaceId === 'apple-iphone-11' ||
        phone.namespaceId === 'apple-iphone-11-pro') &&
      phone.capacity === '128GB' &&
      (phone.color === 'black' ||
        phone.color === 'white' ||
        phone.color === 'gold'),
  );

  return (
    <div className={styles.productList}>
      <h1>Hot Prices</h1>

      <div className={styles.productGrid}>
        {filteredProducts.slice(0, 4).map(product => (
          <DiscountProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.priceRegular}
            discountPrice={product.priceDiscount}
            imageUrl={product.images[0]}
            isFavorite={false}
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
            onAddToCart={id => console.log(`Added ${id} to cart`)}
            onToggleFavorite={id => console.log(`Toggled favorite ${id}`)}
          />
        ))}
      </div>
    </div>
  );
};
