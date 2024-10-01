import React, { useState } from 'react';
import phones from '../../public/api/phones.json';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './BrandNewModels.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

export const BrandNewModels: React.FC = () => {
  const filteredProducts = phones.filter(
    phone =>
      (phone.namespaceId === 'apple-iphone-14-pro' ||
        phone.namespaceId === 'apple-iphone-14-pro-max') &&
      (phone.capacity === '128GB' || phone.capacity === '256GB') &&
      (phone.color === 'spaceblack' ||
        phone.color === 'gold' ||
        phone.color === 'midnight'),
  );
  const { dispatch } = useCart();

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 1;

  const handleNext = () => {
    if (currentIndex + productsPerPage < filteredProducts.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

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

  return (
    <div className={styles.productList}>
      <h1>Brand new models</h1>
      <div className={styles.controls}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={styles.buttons_controls}
        >
          <img src="img/Arrow-left.png" alt="" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + productsPerPage >= filteredProducts.length}
          className={styles.buttons_controls}
        >
          <img src="img/Arrow-right.png" alt="" />
        </button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.slice(0, 4).map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles.linkProduct}
          >
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
              onAddToCart={() => handleAddToCart(product.id)}
              onToggleFavorite={() => handleToggleFavorite(product.id)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
