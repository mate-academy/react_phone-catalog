import { useCart } from '../CartFavContext/CartContext';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import BackButton from '../shared/components/BackButton/BackButton';
import CartItemComponent from './CartItemComponent';
import styles from './Cart.module.scss';
import { useState } from 'react';
import CustomModal from '../shared/components/CustomModal/CustomModal';
const Cart = () => {
  const { cart, totalAmount, totalCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCheckout = () => {
    setIsModalOpen(prev => !prev);
  };
  return cart.length > 0 ? (
    <div className={styles.cartPage__container}>
      <PageHeader
        title="Cart"
        showBreadCrumbs={false}
        extraContent={<BackButton label="Back" />}
        variant="cartPage"
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className={styles.cartItemsList}>
          {cart.map(item => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        <div className={styles.cartPage__checkoutBlock}>
          <div className={styles.cartPage__checkoutBlockPriceWrapper}>
            <span className={styles.cartPage__checkoutBlockPrice}>
              ${totalAmount}
            </span>
            <span
              className={styles.cartPage__checkoutBlockAmount}
            >{`Total for ${totalCount} items`}</span>
          </div>
          <button
            className={styles.cartPage__checkoutBlockButton}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
      {isModalOpen && <CustomModal onClose={handleCheckout} />}
    </div>
  ) : (
    <div className={styles.cart_empty}>Your cart is empty</div>
  );
};

export default Cart;
