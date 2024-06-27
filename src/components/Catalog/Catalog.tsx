import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Pagination } from './components/Pagination';
import { getItemsPerPage } from '../../utils/getItemsPerPage';
import { ProductGeneral } from '../../types/ProductGeneral';
import styles from './Catalog.module.scss';

type Props = {
  products: ProductGeneral[];
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = useCallback(() => {
    if (searchParams.get('itemsPerPage') === 'All') {
      return products.length;
    }

    return +(searchParams.get('itemsPerPage') || products.length);
  }, [products, searchParams]);

  const selectedPage = +(searchParams.get('page') || 1);
  const numberOfPages = Math.ceil(products.length / itemsPerPage());

  const displayedProducts = useMemo(() => {
    return getItemsPerPage(products, itemsPerPage(), selectedPage);
  }, [products, itemsPerPage, selectedPage]);

  return (
    <section className={styles.container}>
      <div className={styles.gridContainer}>
        {displayedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            displayFullPrice={true}
          />
        ))}
      </div>
      {numberOfPages > 1 && (
        <div className={styles.bottom}>
          <Pagination numberOfPages={numberOfPages} />
        </div>
      )}
    </section>
  );
};
