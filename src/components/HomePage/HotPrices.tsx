import React from 'react';
import Product from '../../types/product';
import pagination from '../../utils/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[] | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const HotPrices = ({ products, currentPage, setCurrentPage }: Props) => {
  const productsWithDiscount = products
    ?.filter(p => (p.fullPrice ?? p.price) - (p.price ?? 0) > 0)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .map(product => {
      return { ...product, discount: product.fullPrice - product.price };
    });

  const { currentItems, totalPages } = pagination<Product>(
    4,
    productsWithDiscount || [],
    currentPage,
  );

  return (
    <div className="homepage__products-container">
      <div className="homepage__products-header">
        <h2 className="homepage__products-title">Hot prices</h2>
        <div className="homepage__products-buttons">
          <button
            className="homepage__products-button"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="homepage__products-button"
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="homepage__products-models">
        {currentItems?.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
