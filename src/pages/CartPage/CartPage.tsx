import { useEffect, useState } from 'react';
import { Product } from '../../components/ProductCarousel';
import { loadCart, saveCart } from '../../services/cart';
import { BackCrumb } from '../../components/BackCrumb';
import { CartCatalog } from '../../components/CartCatalog';

import styles from './CartPage.module.scss';
import { Modal } from '../../components/Modal';
export const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => loadCart());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateAmount = (productId: string, newAmount: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.itemId === productId ? { ...item, amount: newAmount } : item,
      ),
    );
  };

  const handleRemoveItem = (productId: string) => {
    const items = cartItems.filter(item => item.itemId !== productId);

    setCartItems(items);
    saveCart(items);
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  // Загальна сума тепер рахується легко:
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.amount || 1),
    0,
  );

  useEffect(() => {
    const syncCart = () => {
      setCartItems(loadCart());
    };

    window.addEventListener('cart-updated', syncCart);

    return () => {
      window.removeEventListener('cart-updated', syncCart);
    };
  }, []);

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
      <div className={styles.cart_catalog}>
        <CartCatalog
          products={cartItems}
          handleUpdateAmount={handleUpdateAmount}
          handleRemoveItem={handleRemoveItem}
        />
      </div>

      <div className={styles.cart_total}>
        <p className={styles.cart_total__sum}>${totalPrice}</p>
        <p className={styles.cart_total__length}>
          Total for {cartItems.length} items
        </p>
        <hr />
        <button
          className={styles.cart_total__checkout_btn}
          onClick={() => setIsModalOpen(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
