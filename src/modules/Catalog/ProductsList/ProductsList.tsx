import { ProductCard } from '../../shared/ProductCard';
import { Device } from '../../types';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  productsToRender: Device[];
}

export const ProductsList: React.FC<ProductsListProps> = ({
  productsToRender,
}) => {
  return (
    <div className={styles.productsList__Container}>
      {productsToRender.map(device => (
        <ProductCard device={device} key={device.id} />
      ))}
    </div>
  );
};
