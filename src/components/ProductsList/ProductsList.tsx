import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

interface Product {
  id: string;
  category?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  capacity: string;
  ram: string;
}

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.listGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
