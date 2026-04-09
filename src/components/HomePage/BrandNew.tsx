import React from 'react';
import Product from '../../types/product';
import pagination from '../../utils/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[] | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const BrandNew = ({ products, currentPage, setCurrentPage }: Props) => {
  const brandNew = products?.filter(product => product.year === 2022);

  const { currentItems, totalPages } = pagination<Product>(
    4,
    brandNew || [],
    currentPage,
  );

  return (
    <div className="homepage__products-container">
      <div className="homepage__products-header">
        <h2 className="homepage__products-title">Brand new models</h2>
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
