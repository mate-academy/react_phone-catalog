import styles from './Products.module.scss';
import '../../styles/App.scss';
import ProductsNav from '../ProductsNav';
import ProductList from '../ProductList';
import { Product } from '../../types/products';
import { useMemo } from 'react';

interface ProductsProps {
  products: Product[];
  pageSize?: string;
  currentPage?: number;
  onSetCurrentPage: (page: number) => void;
}

const Products: React.FC<ProductsProps> = ({
  products,
  pageSize = '4',
  currentPage = 1,
  onSetCurrentPage,
}) => {
  const { paginatedProducts, totalPages } = useMemo(() => {
    if (pageSize === 'All') {
      return { paginatedProducts: products, totalPages: 1 };
    }

    const parsedPageSize = Number(pageSize);
    const calculatedTotalPages = Math.ceil(products.length / parsedPageSize);
    const startIndex = (currentPage - 1) * parsedPageSize;
    const endIndex = startIndex + parsedPageSize;
    const slicedProducts = products.slice(startIndex, endIndex);

    return {
      paginatedProducts: slicedProducts,
      totalPages: calculatedTotalPages,
    };
  }, [products, pageSize, currentPage]);

  return (
    <section className={styles.products}>
      <ProductList products={paginatedProducts} />
      {totalPages > 1 && (
        <div className={styles.products__nav}>
          <ProductsNav
            currentPage={currentPage}
            totalPages={totalPages}
            onSetCurrentPage={onSetCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Products;
