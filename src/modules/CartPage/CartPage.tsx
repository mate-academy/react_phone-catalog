import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../features/types/productType';
import { getProducts } from '../../api/products';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Loader } from '../../components/Loader';
import styles from './CartPage.module.scss';
import {
  clearCart,
  increaseQuantity,
  minusQuantity,
  removeInCart,
} from '../../features/slices/cartSlice/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { Chevron } from '../../components/icons/Chevron';
import { CartItemCard } from '../../components/CartItemCard';
import { CheckoutModal } from '../../components/CheckoutModal';

export const CartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartListItems = useSelector((state: RootState) => state.cartList.items);

  const cartItemsMap = useMemo(() => {
    return Object.fromEntries(
      cartListItems.map(item => [item.itemId, item.quantity]),
    ) as Record<string, number>;
  }, [cartListItems]);

  const cartProducts = useMemo(() => {
    return products.filter(product => cartItemsMap[product.itemId]);
  }, [products, cartItemsMap]);

  const totalSum = useMemo(() => {
    return cartProducts.reduce((acc, product) => {
      return acc + product.price * cartItemsMap[product.itemId];
    }, 0);
  }, [cartProducts, cartItemsMap]);

  const totalItems = useMemo(() => {
    return cartListItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartListItems]);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!totalItems) {
    return (
      <div className={styles.cartEmpty}>
        <img
          src="/img/cart-is-empty.png"
          alt="Empty cart illustration"
          className={styles.cartEmpty__img}
        />
        <h4 className={styles.cartEmpty__title}>Your cart is empty</h4>
        <NavLink to="/" className={styles.cartEmpty__link}>
          Back to Home
        </NavLink>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.cart__back}
        >
          <div className={styles.cart__backIcon}>
            <Chevron direction="left" />
          </div>
          <p>Back</p>
        </button>
        <h1 className={styles.cart__title}>Cart</h1>
      </div>

      <div className={styles.cart__products}>
        {cartProducts.map(product => (
          <CartItemCard
            key={product.itemId}
            product={product}
            quantity={cartItemsMap[product.itemId]}
            onRemove={() => dispatch(removeInCart(product.itemId))}
            onDecrease={() => dispatch(minusQuantity(product.itemId))}
            onIncrease={() => dispatch(increaseQuantity(product.itemId))}
          />
        ))}
      </div>

      <div className={styles.cart__summary}>
        <h2 className={styles.cart__summaryPrice}>${totalSum}</h2>
        <p className={styles.cart__summaryItem}>Total for {totalItems} items</p>
        <div className={styles.cart__summaryLine}></div>
        <button
          type="button"
          className={styles.cart__checkoutButton}
          disabled={!totalItems}
          onClick={() => setIsCheckoutModalOpen(true)}
        >
          Checkout
        </button>
      </div>
      {isCheckoutModalOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutModalOpen(false)}
          onConfirm={() => {
            dispatch(clearCart());
            setIsCheckoutModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
