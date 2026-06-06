import classNames from 'classnames';
import styles from './AddButtonToCart.module.scss';
import { CartContext } from '../../Contexts/CartContext/CartContext';
import { useContext } from 'react';
import { Products } from '../../types/Products';

type Props = {
  variant?: 'smallButtonSize' | 'bigButtonSize';
  product: Products;
};

export const AddButtonToCart: React.FC<Props> = ({ variant, product }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const exist = cartItems.some(item => item.id === product?.id);
  const text = exist ? 'Added to cart' : 'Add to cart';
  const buttonsColor = exist ? styles.white : styles.orange;

  return (
    <button
      className={classNames(styles.buttonAdd, styles.buttons, buttonsColor, {
        [styles.addBig]: variant === 'bigButtonSize',
        [styles.added]: exist,
      })}
      onClick={() => {
        addToCart(product);
      }}
    >
      {text}
    </button>
  );
};

export default AddButtonToCart;
