/* eslint-disable no-console */
import React from 'react';
import phones from '../../public/api/phones.json';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

export const ProductList: React.FC = () => {
  const filteredProducts = phones.filter(
    phone =>
      (phone.namespaceId === 'apple-iphone-14-pro' ||
        phone.namespaceId === 'apple-iphone-14-pro-max') &&
      (phone.capacity === '128GB' || phone.capacity === '256GB') &&
      (phone.color === 'spaceblack' ||
        phone.color === 'gold' ||
        phone.color === 'midnight'),
  );

  return (
    <div className={styles.productList}>
      <h1>Brand new models</h1>

      <div className={styles.productGrid}>
        {filteredProducts.slice(0, 4).map(product => (
          <ProductCard
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
