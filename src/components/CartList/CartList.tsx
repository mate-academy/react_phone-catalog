import { useContext } from 'react';
import { CatalogContext } from '../../context';
import { CartItem } from '../CartItem';

export const CartList = () => {
  const { cart } = useContext(CatalogContext);

  return (
    <>
      {!cart.length ? (
        <h2 className="cart__empty">Your cart is empty</h2>
      ) : (
        <div className="cart__items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};
