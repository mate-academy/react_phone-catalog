import styles from './CartItem.module.scss';
import CrossIcon from '../CrossIcon/CrossIcon';
import { Product } from '../../types/product';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../store/slices/cartProductsSlice';

interface CartItemProps {
  product?: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const increaseAmount = () => {
    setAmount(prev => prev + 1);
  };

  const lowerAmount = () => {
    setAmount(prev => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };

  const deleteItem = () => {
    if (product) {
      const filtered = cart.filter((item: Product) => item.id !== product.id);

      dispatch(updateCart(filtered));
      setCart(filtered);
      localStorage.setItem('cart', JSON.stringify(filtered));
    }
  };

  useEffect(() => {
    if (!product) {
      return;
    }

    const cartLocalStorage = localStorage.getItem('cart') || '[]';
    const parsedCart = JSON.parse(cartLocalStorage);

    setCart(parsedCart);

    const foundItem = parsedCart.find(
      (item: Product) => item.id === product.id,
    );

    if (foundItem) {
      const updatedCart = parsedCart.map((item: Product) => {
        if (item.id === foundItem.id) {
          return { ...item, quantity: amount };
        }

        return item;
      });

      dispatch(updateCart(updatedCart));
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, [amount, product, dispatch]);

  return (
    <div className={styles.cartItem}>
      <button onClick={deleteItem} className={styles.cartItem__remove}>
        <CrossIcon />
      </button>

      <div className={styles.cartItem__image}>
        <img src={product?.images[0]} alt={product?.name} />
      </div>

      <div className={styles.cartItem__info}>
        <p className={styles.cartItem__title}>{product?.name}</p>
        <p className={styles.cartItem__code}>MQ023</p>
      </div>

      <div className={styles.cartItem__quantity}>
        <button className={styles.cartItem__btn} onClick={lowerAmount}>
          -
        </button>
        <span className={styles.cartItem__count}>{amount}</span>
        <button className={styles.cartItem__btn} onClick={increaseAmount}>
          +
        </button>
      </div>

      <div className={styles.cartItem__price}>
        ${product?.priceRegular ? product.priceRegular * amount : 0}
      </div>
    </div>
  );
};

export default CartItem;
