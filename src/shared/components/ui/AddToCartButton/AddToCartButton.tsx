import styles from './AddToCartButton.module.scss';

type Props = {
  size?: 40 | 48;
};

export const AddToCartButton: React.FC<Props> = ({ size = 40 }) => {
  const sizeClass = size === 40 ? styles.size40 : styles.size48;

  return (
    <button className={`${styles.addToCart} ${sizeClass}`}>Add to cart</button>
  );
};
