import styles from './productQuantity.module.scss';

type Props = {
  quantity: number;
};

export const ProductQuantity: React.FC<Props> = ({ quantity }) => {
  return <p className={styles.productQuantity}>{quantity} models</p>;
};
