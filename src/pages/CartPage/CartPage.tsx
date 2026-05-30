import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Checkout } from './components/Checkout/Checkout';
import styles from './CartPage.module.scss';
import { CartList } from './components/CartList/CartList';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ProductContext);

  const total = cart.reduce(
    (sum, item) => sum + item.priceDiscount * (item.quantity ?? 0),
    0,
  );
  const quantity = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const handleIncrement = (itemId: string) => {
    setCart(prev =>
      prev.map(product =>
        product.id === itemId
          ? { ...product, quantity: (product.quantity ?? 0) + 1 }
          : product,
      ),
    );
  };

  const handleDecrement = (itemId: string) => {
    setCart(prev =>
      prev.map(product =>
        product.id === itemId
          ? { ...product, quantity: (product.quantity ?? 0) - 1 || 1 }
          : product,
      ),
    );
  };

  const handleDelete = (itemId: string) => {
    setCart(prev => prev.filter(product => product.id !== itemId));
  };

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className={styles.cartPage__button}
        >
          Back
        </button>
        <h1 className={styles.cartPage__title}>Cart</h1>

        {cart.length === 0 ? (
          <>
            <p className="hiddenText">Cart is empty</p>
            <div className={styles.cartPage__empty}></div>
          </>
        ) : (
          <section className={styles.cartPage__summary}>
            <CartList
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDelete={handleDelete}
              cart={cart}
            />
            <Checkout quantity={quantity} total={total} />
          </section>
        )}
      </div>
    </div>
  );
};
