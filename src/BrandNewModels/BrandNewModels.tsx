import React, { useState } from 'react';
import phones from '../../public/api/phones.json';
import products from '../../public/api/products.json';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './BrandNewModels.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

const mergeData = () => {
  const formattedPhones = phones.map(phone => ({
    id: phone.id,
    name: phone.name,
    capacity: phone.capacity,
    priceRegular: phone.priceRegular,
    priceDiscount: phone.priceDiscount,
    color: phone.color,
    imageUrl: phone.images[0],
    screen: phone.screen,
    ram: phone.ram,
    year: phone.releaseDate ? new Date(phone.releaseDate).getFullYear() : null,
  }));

  const formattedProducts = products.map(product => ({
    id: product.itemId,
    name: product.name,
    capacity: product.capacity,
    priceRegular: product.fullPrice,
    priceDiscount: product.price,
    color: product.color,
    imageUrl: product.image,
    screen: product.screen,
    ram: product.ram,
    year: product.year,
  }));

  return [...formattedPhones, ...formattedProducts];
};

export const BrandNewModels: React.FC = () => {
  const allProducts = mergeData();

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (!a.year) {
      return 1;
    }

    if (!b.year) {
      return -1;
    }

    return b.year - a.year;
  });

  const { dispatch } = useCart();

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + productsPerPage < sortedProducts.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

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
    <div className={styles.productList}>
      <div className={styles.controls}>
        <h1 className={styles.title}>Brand new models</h1>
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
            disabled={currentIndex + productsPerPage >= sortedProducts.length}
            className={styles.buttons_controls}
          >
            <img src="img/Arrow-right.png" alt="Next" />
          </button>
        </div>
      </div>

      <div className={styles.productGrid}>
        {sortedProducts
          .slice(currentIndex, currentIndex + productsPerPage)
          .map(product => (
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
                imageUrl={product.imageUrl}
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
