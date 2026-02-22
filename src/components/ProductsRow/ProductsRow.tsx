import { Product } from '../../types/products';
import { Card } from '../Card';
import { Carousel } from '../Carousel/Carousel';
import styles from './ProductsRow.module.scss';

interface Props {
  products: Product[];
  hasDiscount: boolean;
  title: string;
}

export const ProductsRow: React.FC<Props> = ({
  products,
  hasDiscount,
  title,
}) => {
  return (
    <section className={styles.productsRow}>
      <Carousel title={title}>
        {products.map(product => (
          <Card
            key={product.id}
            name={product.name}
            image={product.image}
            capacity={product.capacity}
            price={product.price}
            fullPrice={product.fullPrice}
            screen={product.screen}
            ram={product.ram}
            itemId={product.itemId}
            hasDiscount={hasDiscount}
            category={product.category}
            id={product.id}
          />
        ))}
      </Carousel>
    </section>
  );
};
