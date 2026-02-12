import { Categories } from '../../../types/Categories';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  category: Categories;
};

export const ProductsList: React.FC<Props> = ({ products, category }) => {
  return (
    <div className={styles.list}>
      {products.map(item => (
        <ProductCard key={item.id} product={item} category={category} />
      ))}
    </div>
  );
};
