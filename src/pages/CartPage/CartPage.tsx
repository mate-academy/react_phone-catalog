import { useEffect, useState } from 'react';
import { loadCart, saveCart, CartItem } from '../../services/cart';
import { BackCrumb } from '../../components/BackCrumb';
import { CartCatalog } from '../../components/CartCatalog';
import CartIsEmpty from '../../../public/img/cart-is-empty.png';
import styles from './CartPage.module.scss';
import { Modal } from '../../components/Modal';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCart());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateAmount = (productId: string, newQuantity: number) => {
    const updated = cartItems.map(item =>
      String(item.product.itemId) === String(productId)
        ? { ...item, quantity: newQuantity }
        : item,
    );

    setCartItems(updated);
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartItems.filter(
      item => String(item.product.itemId) !== String(productId),
    );

    setCartItems(updated);
    saveCart(updated);
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product.priceDiscount || item.product.price || 0) * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const syncCart = () => setCartItems(loadCart());

    window.addEventListener('cart-updated', syncCart);

    return () => window.removeEventListener('cart-updated', syncCart);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="grid">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            handleClearCart();
            setIsModalOpen(false);
          }}
          title="Cart"
        >
          <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
        </Modal>
      )}

      <div className={styles.cart_header}>
        <BackCrumb />
        <h1 className={styles.cart_title}>Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.cart_empty}>
          <img src={CartIsEmpty} alt="Cart is empty" />
        </div>
      ) : (
        <>
          <div className={styles.cart_catalog}>
            <CartCatalog
              products={cartItems}
              handleUpdateAmount={handleUpdateAmount}
              handleRemoveItem={handleRemoveItem}
            />
          </div>

          <div className={styles.cart_total}>
            <p className={styles.cart_total__sum}>${totalPrice}</p>
            {/* ✅ тепер показує суму quantity, а не довжину масиву */}
            <p className={styles.cart_total__length}>
              Total for {totalItems} items
            </p>
            <hr />
            <button
              className={styles.cart_total__checkout_btn}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
