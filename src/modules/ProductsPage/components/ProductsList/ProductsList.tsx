import styles from './ProductsList.module.scss';
import ProductCard from '../../../shared/components/ProductCard/ProductCard';
import { Product, ProductWithDetails } from '../../../../_types/products';

type Props = {
  products: ProductWithDetails[] | Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles['product-list']}>
      {products.map(item => (
        <li key={item.id} className={styles['product-list__item']}>
          <ProductCard product={item} isShowfullPrice={true} />
        </li>
      ))}
    </ul>
  );
};
