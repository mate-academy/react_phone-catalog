import apiProducts from '../../../public/api/products.json';
import styles from './ProductsList.module.scss';
import React, { useMemo } from 'react';
import { ProductCard } from '../shared/ProductCard/ProductCard';
import { SortValue } from 'models/sortvalue.model';

type Props = {
  category: string;
  sort: SortValue;
  page: number;
  perPage: string;
};

export const ProductsList: React.FC<Props> = ({
  category,
  sort,
  page,
  perPage,
}) => {
  const visibleProducts = useMemo(() => {
    const filtered = apiProducts.filter(
      product => product.category === category,
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.year - a.year;

        case 'oldest':
          return a.year - b.year;

        case 'alpha-asc':
          return a.name.localeCompare(b.name);

        case 'alpha-desc':
          return b.name.localeCompare(a.name);

        case 'price-low-high':
          return a.price - b.price;

        case 'price-high-low':
          return b.price - a.price;

        default:
          return 0;
      }
    });

    if (perPage === 'all') {
      return sorted;
    }

    const perPageNumber = Number(perPage);
    const start = (page - 1) * perPageNumber;
    const end = start + perPageNumber;

    return sorted.slice(start, end);
  }, [category, sort, page, perPage]);

  return (
    <>
      <div className={styles.productsList}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
