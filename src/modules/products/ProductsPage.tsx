import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Pagination } from '@shared/components/Pagination';
import { ProductsCards } from '@shared/components/ProductsCards';

import { ProductsHeader } from './components/ProductsHeader';
import { useProducts } from './hooks/useProducts';
import styles from './ProductsPage.module.scss';

const CATALOG_TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = () => {
  const navigate = useNavigate();

  const { products, category, isLoading } = useProducts();

  if (!category) {
    navigate('/');

    return null;
  }

  return (
    <Box className={cn('container', styles.container)}>
      <ProductsHeader
        className={styles.header}
        category={category}
        title={CATALOG_TITLES[category]}
        total={products?.meta.total}
        isLoading={isLoading}
      />

      <ProductsCards products={products?.data} isLoading={isLoading} />

      {products && (
        <Pagination
          page={products.meta.page}
          totalPages={products?.meta.totalPages}
          className={styles.pagination}
        />
      )}
    </Box>
  );
};
