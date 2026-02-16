import style from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductInCart } from '../../components/ProductInCart';
import { useContext } from 'react';
import { CartContext } from '../../store/CartProvider';
import emptyCart from '../../assets/img/cart-is-empty.png';

export const CartPage = () => {
  const { cart, setCart, getLengthOfCart } = useContext(CartContext);
  const navigate = useNavigate();

  const getSum = () => {
    return cart.reduce((acc, val) => acc + val.price * (val.inCart || 1), 0);
  };

  const handleCheckout = () => {
    const userResponse = confirm(
      'Checkout is not implemented yet, do you want to clear a cart?',
    );

    if (userResponse) {
      setCart([]);
    }
  };

  return (
    <div className={style.cartPage}>
      <div className={style.backButton} onClick={() => navigate(-1)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </div>

      {!cart.length && (
        <div className={style.emptyCart}>
          <h1 className={style.emptyCart__title}>Your cart is empty</h1>
          <img
            src={emptyCart}
            alt="Empty Cart"
            className={style.emptyCart__img}
          />
        </div>
      )}

      {!!cart.length && (
        <>
          <h1 className={style.title}>Cart</h1>

          <ul className={style.main}>
            {cart.map(prod => (
              <li className={style.card} key={prod.id}>
                <ProductInCart prod={prod} />
              </li>
            ))}
          </ul>

          <div className={style.checkout}>
            <div className={style.checkout__items}>
              <h2 className={style.checkout__items__price}>${getSum()}</h2>
              <p className={style.checkout__items__total}>
                Total for {getLengthOfCart()} items
              </p>
            </div>
            <div className={style.checkout__divider} />
            <button className={style.checkout__button} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
