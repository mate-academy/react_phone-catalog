import { useContext, useMemo, useState } from 'react';
import { BackButton } from '../../../shared/components/BackButton';
import styles from './CartPage.module.scss';
import { CartContext } from '../../../shared/_store/CartProvider';
import { CartItem } from '../CartItem';
import { ProductsContext } from '../../../shared/_store/DataProvider';
import { DividedLine } from '../../../shared/components/DividedLine';
import { ButtonPrimary } from '../../../shared/components/ButtonPrimary';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, clearCart } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const { cartWithProducts, totalPrice, totalAmount } = useMemo(() => {
    let price = 0;
    let amount = 0;

    const updatedCart = cart.map(item => {
      const product = products.find(({ itemId }) => itemId === item.id);

      if (product) {
        price += (product.price || 0) * item.quantity;
        amount += item.quantity;
      }

      return { ...item, product };
    });

    return {
      cartWithProducts: updatedCart,
      totalPrice: price,
      totalAmount: amount,
    };
  }, [cart, products]);

  const confirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const cancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cartPage}>
      <BackButton />
      {cart.length === 0 ? (
        <h2 className={styles.cartPage__empty}>Your cart is empty</h2>
      ) : (
        <div className={styles.cartPage__content}>
          <h1 className={styles.cartPage__title}>Cart</h1>
          <ul className={styles.cartPage__list}>
            {cartWithProducts.map(item => (
              <li key={item.id}>
                <CartItem cartItem={item} />
              </li>
            ))}
          </ul>
          <div className={styles.cartPage__total}>
            <div>
              <h2 className={styles.cartPage__price}>&#36;{totalPrice}</h2>
              <div className={styles.cartPage__text}>
                Total for {totalAmount} items
              </div>
            </div>
            <DividedLine />
            <div className={styles.cartPage__checkout}>
              <ButtonPrimary
                title={'Checkout'}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className={styles.cartPage__modal}>
          <DividedLine />
          <h4>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </h4>
          <DividedLine />
          <ButtonPrimary title={'Yes'} onClick={confirmCheckout} />
          <ButtonPrimary title={'No'} onClick={cancelCheckout} />
        </div>
      )}
    </div>
  );
};
