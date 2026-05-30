import styles from './ActionBtns.module.scss';
import { CartAddRequest, Product, ShortProduct } from '../../shared/models';
import { useCart } from '../../shared/context/CartContext';
import { toast } from 'react-toastify';

interface Props {
  product: Product | ShortProduct;
  assignClassName?: string;
}

export const AddToCartBtns: React.FC<Props> = ({
  product,
  assignClassName,
}) => {
  const { addToCart, cartItems } = useCart();

  const isInCart = cartItems.some(item => item.product.id === product.id);
  const notify = () =>
    toast.success('Added to cart!', {
      position: 'top-right',
      autoClose: 1000,
      theme: 'dark',
    });

  function addItemToCart() {
    const newItem: CartAddRequest = {
      product: product,
      quantity: 1,
    };
    addToCart(newItem);
    setTimeout(() => toast.dismiss(), 2000);
    notify();
  }

  return (
    <button
      className={`${styles.addBtn} ${assignClassName}`}
      onClick={addItemToCart}
      disabled={isInCart}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
