import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductsList.scss';
import { Product } from '../../helpers/types/Product';
import { ProductCard } from '../ProductCard';
import { sortProducts } from '../../helpers/utils/sortProducts';

type Props = {
  filteredProducts: Product[];
  hasOnlyOnePage?: boolean;
};

export const ProductsList: React.FC<Props> = ({
  filteredProducts,
  hasOnlyOnePage = false,
}) => {
  const [searchParams] = useSearchParams();

  const pageNum = +(searchParams.get('page') || 1);
  const sortQuery = searchParams.get('sort') || 'newest';

  const itemsOnPage = hasOnlyOnePage
    ? filteredProducts.length
    : +(searchParams.get('item') || 4) || filteredProducts.length;

  const endIndex = pageNum * itemsOnPage;
  const startIndex = endIndex - itemsOnPage;

  const visibleProducts = sortProducts(sortQuery, filteredProducts).slice(
    startIndex,
    endIndex,
  );

  return (
    <section className="products-list">
      <div className="products-list__container">
        {visibleProducts.map(product => (
          <div className="products-list__cart" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
