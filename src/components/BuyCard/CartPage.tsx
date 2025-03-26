import { useEffect, useState } from 'react';
import back from '../../../image/back.svg';
import { ByCardItem } from '../ByCardItem/ByCardItem';
import { useInfoHook } from '../ProductInformation/InfoHook';
import { Product } from '../../types/ProductTypes';
import './CardPage.scss';
import { useCart } from './CartContext';
import ReactConfetti from 'react-confetti';

export const CardPage = () => {
  const { navigate } = useInfoHook();
  const [cart, setCart] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, []);

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(
        (item: Product) => String(item.id) !== productId,
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const updateQuantify = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map((item: Product) =>
        String(item.id) === productId ? { ...item, quantity } : item,
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const totalCartPrice = cart.reduce((total, item) => {
    const itemPrice = item.fullPrice * (item.quantity || 1);

    return total + itemPrice;
  }, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setIsModalOpen(false);
    clearCart();
    setIsCheckoutConfirmed(true);

    setTimeout(() => {
      setIsCheckoutConfirmed(false);
    }, 5000);
  };

  return (
    <main className="main__phonepage">
      <h1 className="title">
        <div className="productInfolink__back">
          <img src={back} alt="back__link" onClick={() => navigate(-1)} />
          <p
            className="productInfolink__backTitle"
            onClick={() => navigate(-1)}
          >
            Back
          </p>
        </div>
      </h1>
      <h1 className="page__title">Cart</h1>

      {cart.length > 0 ? (
        <div className="cart__wrapper">
          <div className="cart__wrapper--left">
            {cart.map(product => (
              <ByCardItem
                key={product.id}
                product={product}
                onDelete={removeFromCart}
                onUpdate={updateQuantify}
              />
            ))}
          </div>
          <div className="cart__wrapper--right">
            <h1 className="window__price">{`$${totalCartPrice}`}</h1>
            <p className="window__title">{`Total for ${cart.length} item(s)`}</p>
            <div className="product__line"></div>
            <button className="Checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <img
          className="product_yet"
          src="public\img\product-not-found.png"
          alt="No_favorite_product_yet"
        />
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Are you sure you want to buy this?</h2>
            <p className="window__price">{`Total: $${totalCartPrice}`}</p>
            <div className="modalbutton__wrapper">
              <button className="confirm" onClick={confirmCheckout}>
                Confirm
              </button>
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCheckoutConfirmed && <ReactConfetti />}
    </main>
  );
};
