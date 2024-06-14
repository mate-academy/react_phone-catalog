import { FC, useState } from 'react';

import { BsCartX } from 'react-icons/bs';
import BackLink from '../../UI/BackLink/BackLink';
import Button from '../../UI/Buttons/Button';
import Heading from '../../UI/Heading/Heading';
import { useCartStore } from '../../store/cartStore';
import styles from './CartPage.module.css';
import CartItem from './components/CartItem/CartItem';
import CheckoutModal from './components/CheckoutModal/CheckoutModal';

const CartPage: FC = () => {
  const { cartItems, changeQuantityInCart, deleteProductInCart, clearCart } =
    useCartStore(state => ({
      cartItems: state.cartItems,
      changeQuantityInCart: state.changeQuantityInCart,
      deleteProductInCart: state.deleteProductInCart,
      clearCart: state.clearCart,
    }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (price, cartItem) =>
      price + cartItem.product.priceDiscount * cartItem.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const handleConfirmOrder = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <section className={styles.wrapper}>
        <BackLink className={styles.backLink} />

        <Heading as="h1" className={styles.heading}>
          Cart
        </Heading>

        {cartItems.length !== 0 ? (
          <div className="grid">
            <ul className={styles.list}>
              {cartItems.map(cartItem => (
                <li key={cartItem.id} className={styles.item}>
                  <CartItem
                    product={cartItem.product}
                    quantity={cartItem.quantity}
                    onDelete={deleteProductInCart}
                    onMinus={id => changeQuantityInCart(id, 'sub')}
                    onPlus={id => changeQuantityInCart(id, 'add')}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.info}>
              <Heading as="h2" className={styles.price}>
                ${totalPrice}
              </Heading>
              <p className={styles.descr}>
                Total for {totalQuantity}{' '}
                {totalQuantity === 1 ? 'item' : 'items'}
              </p>
              <Button
                variant="primary"
                className={styles.btn}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Heading as="h3" className={styles.empty}>
              Your cart is empty 🤔
            </Heading>

            <BsCartX size={150} />
          </>
        )}
      </section>

      {isModalOpen && (
        <CheckoutModal
          closeModal={() => setIsModalOpen(false)}
          confirmOrder={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default CartPage;
