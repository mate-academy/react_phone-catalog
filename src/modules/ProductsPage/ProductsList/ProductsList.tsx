import { Product } from '../../shared/types/Product';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';
import { useSearchParams } from 'react-router-dom';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || '';

  let visibleProducts = [...products];

  if (sort) {
    visibleProducts = visibleProducts.sort((p1, p2) => {
      if (sort === 'title') {
        return p1.name.localeCompare(p2.name);
      }

      if (sort === 'age') {
        return p1.year - p2.year;
      }

      if (sort === 'price') {
        return p1.price - p2.price;
      }

      return 0;
    });
  }

  if (perPage && perPage !== 'all') {
    const currentPage = Number(page);
    const perPageNumber = Number(perPage);
    const from = currentPage === 1 ? 0 : (currentPage - 1) * perPageNumber + 1;
    let to = from + perPageNumber;
    const total = visibleProducts.length;

    if (to > total) {
      to = total;
    }

    visibleProducts = visibleProducts.slice(from, to);
  }

  return (
    <div className={styles.productsList}>
      {visibleProducts.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
