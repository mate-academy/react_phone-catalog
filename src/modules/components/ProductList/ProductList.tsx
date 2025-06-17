import { ProductCard } from '@components/ProductCard';
import { Product } from '@models/Product';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  isLightMode: boolean;
};

export const ProductList: React.FC<Props> = ({ products, isLightMode }) => {
  return (
    <div className={styles.products__list}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          withFullPrice={false}
          isLightMode={isLightMode}
        />
      ))}
    </div>
  );
};
