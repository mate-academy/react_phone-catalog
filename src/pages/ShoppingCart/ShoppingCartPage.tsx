import { Link } from 'react-router-dom';
import './ShoppingCartPage.scss';
import { useEffect } from 'react';
import { CartItem } from '../../components/CartItem';
import { useLocalStorage } from '../../services/getLocalStorage';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCart } from '../../features/cart';
import { Gadget } from '../../types/Gadget';
import { CartProduct } from '../../types/CartProduct';
import { Loader } from '../../components/Loader';
import { init } from '../../features/productSlice';

export const ShoppingCartPage = () => {
  // eslint-disable-next-line max-len, prettier/prettier
  const [storedCart, setStoredCart] = useLocalStorage<CartProduct[]>(
    'cart',
    [],
  );
  const dispatch = useAppDispatch();
  const { products: cartItems, totalCount } = useAppSelector(
    state => state.cart,
  );
  const { items: allProducts, loading } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    if (!!storedCart.length) {
      dispatch(setCart(storedCart));
    }
  }, [dispatch, storedCart]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    setStoredCart(cartItems);
  }, [cartItems, setStoredCart]);

  const cartProducts = cartItems
    .map(cartItem => {
      const item = allProducts.find(product => product.itemId === cartItem.id);

      return item ? { ...item, count: cartItem.count } : null;
    })
    .filter(product => product !== null) as (Gadget & { count: number })[];

  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.count,
    0,
  );

  return (
    <div className="container">
      <div className="cart">
        <Link to=".." className="cart__back">
          <div className="cart__back--arrow">
            <svg className="icon icon-arrow-left-back">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </div>
          <p className="cart__back--text">Back</p>
        </Link>
        <h2 className="cart__title">Cart</h2>
        <div className="cart__content">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!!cartProducts.length && !loading ? (
                cartProducts.map(product => (
                  <CartItem key={product.id} product={product} />
                ))
              ) : (
                <>
                  <p className="cart__content--empty">Your cart is empty</p>
                  <img src="img/cart-is-empty.png" alt="cart-is-empty" />
                </>
              )}
            </>
          )}
        </div>
        {!!cartProducts.length && (
          <div className="cart__checkout">
            <p className="cart__checkout--total">${total}</p>
            <p className="cart__checkout--info">
              {`Total for ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}
            </p>
            <button type="button" className="cart__checkout--btn">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
