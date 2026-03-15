import React, { useMemo } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { PerPageOption } from '../../types/Sort';
import { Pagination } from '../UI/Pagination';

interface ProductListProps {
  filteredProducts: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || PerPageOption.Sixteen);

  const totalPages =
    perPage === PerPageOption.All
      ? 1
      : Math.ceil(filteredProducts.length / perPage);

  const visibleProducts = useMemo(() => {
    if (perPage === PerPageOption.All) {
      return filteredProducts;
    }

    const start = (page - 1) * perPage;

    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page, perPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });
  };

  return (
    <div className={styles.phonesContainer}>
      {visibleProducts.length > 0 ? (
        <div className={styles.phonesWrapper}>
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              imageWrapperSize="large"
              classNames="responsive"
            />
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}

      {perPage !== 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
