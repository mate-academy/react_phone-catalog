import Button from '../Button/index';
import buttonStyles from '../Button/Button.module.scss';
import styles from './AddToCartButton.module.scss';

type AddToCartButtonProps = {
  onClick: () => void;
  isInCart: boolean;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  isInCart,
}) => {
  return (
    <Button
      className={`${buttonStyles.button} ${styles['button--add-to-card']}`}
      onClick={onClick}
      disabled={isInCart}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
