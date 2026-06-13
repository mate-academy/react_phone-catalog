
import { ProductCardData } from '../../types/ProductCardData';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
type Props = {
  className: string;
  products: ProductCardData[];
};
export const ProductList: React.FC<Props> = ({ className, products }) => {
  return (
    <ul className={`${styles.productList} ${className}`}>
      {products.map(product => (
        <li key={product.id} className={styles.productList__item}>
          <ProductCard product={product} isShowDiscount={true}></ProductCard>
        </li>
      ))}
    </ul>
  );
};
