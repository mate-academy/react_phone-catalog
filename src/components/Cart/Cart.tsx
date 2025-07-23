import { Link } from 'react-router-dom';
import cartStyle from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { Products } from '../../types/types';
import { useEffect } from 'react';

const Cart = () => {
  const { cartItems, setCartItems } = useCart();

  const addedArray: Products[] | [] = JSON.parse(
    localStorage.getItem('added') || '[]',
  );

  useEffect(() => {
    setCartItems(addedArray);
  }, []);

  console.log(addedArray);
  console.log(cartItems);

  return (
    <>
      <div className={cartStyle.cart}>
        <div className={cartStyle['cart__path-of-user']}>
          <span className={cartStyle['cart__arrow-left']}></span>
          <Link to="/" className={cartStyle.cart__where}>
            Back
          </Link>
        </div>

        <h1 className={cartStyle.cart__title}>Cart</h1>

        {cartItems.length === 0 && (
          <img src="public/img/cart-is-empty.png" alt="epty bag" />
        )}

        {cartItems.map(item => {
          return (
            <div className={cartStyle.cart__cart} key={item.itemId}>
              <img
                src={item.image}
                alt="image"
                className={cartStyle.cart__image}
              />

              <div className={cartStyle.cartStyle__name}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
