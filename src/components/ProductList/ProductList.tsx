import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import './ProductList.scss';

interface ProductListProps {
  title: string;
  products: Product[];
  showControls?: boolean;
  itemsToShow?: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  showControls = true,
  itemsToShow = 4,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / itemsToShow);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isAtStart = currentPage === 0;
  const isAtEnd =
    currentPage === totalPages - 1 || products.length <= itemsToShow;

  // Calculate which products to display
  const startIndex = currentPage * itemsToShow;
  const endIndex = Math.min(startIndex + itemsToShow, products.length);
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <section className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">{title}</h2>
        {showControls && totalPages > 1 && (
          <div className="product-list__controls">
            <button
              className={`product-list__control product-list__control--prev ${isAtStart ? 'product-list__control--disabled' : ''}`}
              onClick={handlePrevClick}
              disabled={isAtStart}
            >
              &lt;
            </button>
            <button
              className={`product-list__control product-list__control--next ${isAtEnd ? 'product-list__control--disabled' : ''}`}
              onClick={handleNextClick}
              disabled={isAtEnd}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <div className="product-list__grid">
        {displayedProducts.map(product => (
          <div key={`item-${product.id}`} className="product-list__item">
            <ProductCard
              id={product.id}
              uniqueId={product.uniqueId}
              category={product.category}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
