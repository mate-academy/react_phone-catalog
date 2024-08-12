import { Products } from '../../../type/Products';
import { Card } from '../Card/Card';
import styles from './CardList.module.scss';

type Props = {
  products: Products[];
};

export const CradList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.container}>
      {products.map(product => (
        <div className={styles.center} key={product.id}>
          <Card product={product} discount={true} />
        </div>
      ))}
    </div>
  );
};
