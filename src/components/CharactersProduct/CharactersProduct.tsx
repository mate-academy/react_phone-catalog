import { Product } from '../../types/ProductTypes';
import styles from '../CharactersProduct/CharactersProductStyles.module.scss';

type Props = {
  product: Product;
};

export const CharactersProduct: React.FC<Props> = ({ product }) => {
  return (
    <>
      <p className={styles.characters}>
        Screen <span className={styles.span_caracters}>{product.screen}</span>
      </p>
      <p className={styles.characters}>
        Capacity <span className={styles.span_caracters}>{product.capacity}</span>
      </p>
      <p className={styles.characters}>
        RAM <span className={styles.span_caracters}>{product.ram}</span>
      </p>
    </>
  );
};
