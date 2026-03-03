import { Product } from '../../../public/api/types/Product';
import Button from '../Button/index';
import buttonStyles from '../Button/Button.module.scss';
import styles from './AddToCartButton.module.scss';

type AddToCartButtonProps = {
  handleAddToCart?: (product: Product) => void;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  handleAddToCart,
}) => {
  return (
    <Button
      className={`${buttonStyles.button} ${styles['button--add-to-card']}`}
      onClick={() => handleAddToCart && handleAddToCart({} as Product)}
    >
      Add to cart
    </Button>
  );
};
