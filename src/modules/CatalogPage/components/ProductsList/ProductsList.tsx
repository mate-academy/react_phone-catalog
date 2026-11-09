import styles from './ProductsList.module.scss';
import { Product } from '../../../../types/Product';
import { Card } from '../../../Card/Card';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
  className?: string;
};

export const ProductsList: React.FC<Props> = ({
  title,
  products,
  showDiscount = true,
}) => {
  return (
    <div className={styles.sliderBlock}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.slider}>
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            variant="slider"
            showPrices
            showSpecs={false}
            showActions
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </div>
  );
};
