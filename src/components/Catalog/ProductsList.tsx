import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Buttons } from './components/Buttons';
import { getItemsPerPage } from '../../utils/getItemsPerPage';
import { ProductGeneral } from '../../types/ProductGeneral';
import styles from './ProductsList.module.scss';

type Props = {
  products: ProductGeneral[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = +(searchParams.get('itemsPerPage') || products.length);
  const selectedPage = +(searchParams.get('page') || 1);
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = useMemo(() => {
    return getItemsPerPage(products, itemsPerPage, selectedPage);
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
          <Buttons numberOfPages={numberOfPages} />
        </div>
      )}
    </section>
  );
};
