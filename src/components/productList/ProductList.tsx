import { useSearchParams } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import styles from './ProductList.module.scss';
import { sortProducts } from '../../helpers/sortProducts';
import { ProductCard } from '../productCard';
import { Pagination } from '../pagination/Pagination';

type Props = {
  products: ProductInfo[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sortBy') || 'new';
  const onPage = searchParams.get('onPage') || '16';
  const page = searchParams.get('page') || '1';

  const perPage = onPage === 'all' ? products.length : +onPage;

  const sortedProducts = sortProducts(sort, products);

  const startIndex = (+page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, sortedProducts.length);
  const preparedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <section className={styles.products}>
        {preparedProducts.map(product => (
          <div key={product.id} className={styles.products__card}>
            <ProductCard product={product} type={'Hot prices'} />
          </div>
        ))}

        <div className={styles.products__pagination}>
          <Pagination
            total={sortedProducts.length}
            perPage={perPage}
            currentPage={+page}
          />
        </div>
      </section>
    </>
  );
};
