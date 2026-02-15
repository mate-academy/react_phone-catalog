import styles from './productQuantity.module.scss';

type Props = {
  quantity: number;
  favorites?: boolean;
};

export const ProductQuantity: React.FC<Props> = ({ quantity, favorites }) => {
  return (
    <p className={styles.productQuantity}>
      {quantity} {favorites ? 'items' : 'models'}
    </p>
  );
};
