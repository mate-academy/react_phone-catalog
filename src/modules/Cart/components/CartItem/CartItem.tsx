import { useContext } from 'react';
import { StorageCartItem } from '../../../../api/types';
import scss from './CartItem.module.scss';
import { Counter } from './Counter';
import { DataContext } from '../../../../context/ContextProvider';

interface Props {
  item: StorageCartItem;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { setCartItems } = useContext(DataContext);

  const handleQuantityChange = (newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    );
  };

  const handleRemoveItem = () => {
    setCartItems(prevItems =>
      prevItems.filter(cartItem => cartItem.id !== item.id),
    );
  };

  return (
    <article className={scss.cartItem}>
      <div className={scss.cartItem__firstRow}>
        <button type="button" onClick={handleRemoveItem}>
          <svg className={scss.cartItem__cross}>
            <use href="/icons/icons.svg#close-icon"></use>
          </svg>
        </button>
        <img
          src={`/${item.image}`}
          className={scss.cartItem__image}
          alt={item.name}
        ></img>
        <span className={scss.cartItem__name}>{item.name}</span>
      </div>
      <div className={scss.cartItem__secondRow}>
        <Counter
          quantity={item.quantity}
          onQuantityChange={handleQuantityChange}
        />
        <span className={scss.cartItem__price}>{`$${item.price}`}</span>
      </div>
    </article>
  );
};
