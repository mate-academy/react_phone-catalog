import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type UiProduct = {
  id: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  year: number;
};

type Props = {
  products: UiProduct[];
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.list}>
    {products.map(p => (
      <ProductCard
        key={p.id}
        product={{
          id: p.id,
          title: p.name,
          img: p.image,
          price: p.price,
          oldPrice: p.fullPrice > p.price ? p.fullPrice : undefined,
          year: p.year,
          screen: '',
          capacity: '',
          ram: '',
        }}
      />
    ))}
  </div>
);
