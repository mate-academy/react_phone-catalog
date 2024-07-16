import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import './ShoppingCartPage.scss';
import { useEffect, useState } from 'react';
import { CartItem } from '../../components/CartItem';
import { useLocalStorage } from '../../services/getLocalStorage';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCart, setLoading } from '../../features/cart';
import { setError, setProducts } from '../../features/productSlice';
import { getProducts } from '../../services/products';
import { Gadget } from '../../types/Gadget';
import { CartProduct } from '../../types/CartProduct';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';

export const ShoppingCartPage = () => {
  // eslint-disable-next-line max-len, prettier/prettier
  const [storedCart, setStoredCart] = useLocalStorage<CartProduct[]>('cart', []);
  const dispatch = useDispatch();
  const cartItems = useAppSelector(state => state.cart.products);
  const loading = useAppSelector(state => state.cart.loading);
  const allProducts = useAppSelector(state => state.products.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!!storedCart.length) {
      dispatch(setCart(storedCart));
    }
  }, [dispatch, storedCart]);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const products = await getProducts();

        dispatch(setProducts(products));
      } catch (err) {
        dispatch(setError('Failed to fetch products'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
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

  const totalCount = cartProducts.reduce(
    (acc, product) => acc + product.count,
    0,
  );

  return (
    <>
      <Header />
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
              <button
                type="button"
                className="cart__checkout--btn"
                onClick={openModal}
              >
                Checkout
              </button>
              {isModalOpen && <Modal onClose={closeModal} />}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
