import React, { useRef, useMemo } from 'react';
import './ProductsSlider.scss'; // Стилі (див. нижче)
import { Product } from '@/types';

// Допоміжний компонент картки (можна винести в окремий файл ProductCard.tsx)
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      <h3 className="product-card__title">{product.name}</h3>

      <div className="product-card__prices">
        <span className="product-card__price">${product.price}</span>
        <span className="product-card__full-price">${product.fullPrice}</span>
      </div>

      <div className="product-card__specs">
        <div className="spec-row">
          <span className="spec-label">Screen</span>
          <span className="spec-value">{product.screen}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Capacity</span>
          <span className="spec-value">{product.capacity}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">RAM</span>
          <span className="spec-value">{product.ram}</span>
        </div>
      </div>

      <div className="product-card__actions">
        <button className="btn-add">Add to cart</button>
        <button className="btn-fav">
          {/* SVG для сердечка */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

interface Props {
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const listRef = useRef<HTMLDivElement>(null);

  // 1. Фільтруємо (тільки зі знижкою) та 2. Сортуємо за абсолютною величиною знижки
  const hotProducts = useMemo(() => {
    return products
      .filter(p => p.fullPrice > p.price) // Тільки зі знижкою
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;
        return discountB - discountA; // Спадання (найбільша знижка перша)
      });
  }, [products]);

  // Логіка скролу
  const scroll = (direction: 'left' | 'right') => {
    if (listRef.current) {
      const cardWidth = 288; // Приблизна ширина картки + gap (можна вираховувати динамічно)
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

      listRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (hotProducts.length === 0) return null;

  return (
    <section className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">Hot prices</h2>
        <div className="products-slider__controls">
          <button
            className="nav-btn"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            &lt;
          </button>
          <button
            className="nav-btn"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="products-slider__list" ref={listRef}>
        {hotProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
