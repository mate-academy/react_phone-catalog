import { useNavigate } from 'react-router-dom';
import style from './CartPage.module.scss';
import emptyCart from '../../assets/img/notFound/cart-is-empty.png';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CartItems } from '../../components/CartItems';
import { Product } from '../../types/Product';
import { useEffect } from 'react';
import { init } from '../../features/products';
import { clearCart } from '../../features/cart';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, totalCount } = useAppSelector(state => state.cart);
  const { items, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      dispatch(init());
    }
  }, [dispatch, items, loading]);

  const cartProducts = products
    .map(prod => {
      const item = items.find(product => product.itemId === prod.id);

      return item ? { ...item, count: prod.count } : null;
    })
    .filter(product => product !== null) as (Product & { count: number })[];

  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.count,
    0,
  );
  const clear = () => dispatch(clearCart());

  const handleCheckout = () => {
    const userResponse = confirm(
      'Checkout is not implemented yet, do you want to clear a cart?',
    );

    if (userResponse) {
      clear();
    }
  };

  return (
    <div className={style.cartPage}>
      <div className={style.backButton} onClick={() => navigate(-1)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </div>

      {!products.length && (
        <div className={style.emptyCart}>
          <h1 className={style.emptyCart__title}>Your cart is empty</h1>
          <img
            src={emptyCart}
            alt="Empty Cart"
            className={style.emptyCart__img}
          />
        </div>
      )}

      {!!products.length && (
        <>
          <h1 className={style.title}>Cart</h1>
          <ul className={style.cartList}>
            {cartProducts.map(prod => (
              <li className={style.cartItem} key={prod.id}>
                <CartItems product={prod} />
              </li>
            ))}
          </ul>
        </>
      )}

      {!!products.length && (
        <div className={style.checkout}>
          <p className={style.checkout__total}>${total}</p>
          <p className={style.checkout__info}>
            {`Total for ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}
          </p>
          <div className={style.divider} />
          <button className={style.checkout__btn} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};
