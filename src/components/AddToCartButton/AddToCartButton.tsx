import Button from '../Button/index';
import buttonStyles from '../Button/Button.module.scss';
import styles from './AddToCartButton.module.scss';

type AddToCartButtonProps = {
  onClick: () => void;
  isInCart: boolean;
  removeFromCart: (id: string) => void | undefined;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  isInCart,
  removeFromCart,
}) => {
  return (
    <Button
      className={`${buttonStyles.button} ${isInCart ? styles['button--in-cart'] : ''} ${styles['button--add-to-card']}`}
      onClick={!isInCart ? onClick : removeFromCart}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </Button>
  );
};
