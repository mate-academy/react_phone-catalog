import React, { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { PerPageOption } from '../../types/Sort';
import { Pagination } from '../UI/Pagination';

interface ProductListProps {
  filteredProducts: Product[];
  category: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
}) => {
  const { page, setPage } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const perPage = +(searchParams.get('perPage') || PerPageOption.Sixteen);

  const totalPages =
    perPage === PerPageOption.All
      ? 1
      : Math.ceil(filteredProducts.length / perPage);

  const visibleProducts =
    perPage === PerPageOption.All
      ? filteredProducts
      : filteredProducts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className={styles.phonesContainer}>
      {visibleProducts.length > 0 ? (
        <div className={styles.phonesWrapper}>
          {visibleProducts.map((product: Product) => (
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
