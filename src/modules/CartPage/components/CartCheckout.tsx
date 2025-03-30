import { useContext } from 'react';
import { CartStoreContext } from '../../../Store/CartStore';
import { UpdatedProduct } from '../../shared/Types/types';
import { Link } from 'react-router-dom';

export const CartCheckout = () => {
  const { cartList } = useContext(CartStoreContext);

  const totalPrice = cartList.reduce((acc, cur: UpdatedProduct) => {
    return cur.discount
      ? acc + cur.price * cur.quantity
      : acc + cur.fullPrice * cur.quantity;
  }, 0);

  const totalItems = cartList.reduce((acc, cur: UpdatedProduct) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <div className="cart__checkout">
      <div className="cart__price">
        <h1 className="title title--h1">{`$${totalPrice}`}</h1>

        <p className="body-text">{`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}</p>
      </div>

      <Link to={'/checkout'} className="cart__button">
        Checkout
      </Link>
    </div>
  );
};
