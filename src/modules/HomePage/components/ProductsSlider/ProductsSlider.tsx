import React, { useState } from 'react';
import styles from './ProductsSlider.module.scss';

type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  year: number;
  image?: string;
};

type Props = {
  type: 'hot' | 'new';
};

// Exemplo de produtos
const products: Product[] = [
  { id: 1, name: 'iPhone 13', price: 1000, discount: 150, year: 2023 },
  { id: 2, name: 'iPhone 12', price: 800, discount: 100, year: 2022 },
  { id: 3, name: 'Galaxy S21', price: 900, discount: 120, year: 2023 },
  { id: 4, name: 'Pixel 7', price: 950, discount: 50, year: 2024 },
];

export const ProductsSlider: React.FC<Props> = ({ type }) => {
  const sortedProducts =
    type === 'hot'
      ? [...products].sort((a, b) => b.discount - a.discount)
      : [...products].sort((a, b) => b.year - a.year);

  // índice inicial do slider
  const [startIndex, setStartIndex] = useState(0);

  // Quantos produtos mostrar por vez
  const visibleCount = 3;

  const handleNext = () => {
    setStartIndex(prev =>
      prev + visibleCount >= sortedProducts.length ? 0 : prev + visibleCount,
    );
  };

  const handlePrev = () => {
    setStartIndex(prev =>
      prev - visibleCount < 0
        ? Math.max(sortedProducts.length - visibleCount, 0)
        : prev - visibleCount,
    );
  };

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <div className={styles.slider}>
      <button className={styles.navButton} onClick={handlePrev}>
        {'<'}
      </button>

      <div className={styles.products}>
        {visibleProducts.map(product => (
          <div key={product.id} className={styles.card}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {type === 'hot' ? (
              <p>Discount: ${product.discount}</p>
            ) : (
              <p>Year: {product.year}</p>
            )}
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={handleNext}>
        {'>'}
      </button>
    </div>
  );
};
