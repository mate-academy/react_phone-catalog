import { useEffect, useState } from 'react';
import back from '../../../image/back.svg';
import { ByCardItem } from '../ByCardItem/ByCardItem';
import { useInfoHook } from '../ProductInformation/InfoHook';
import { ProductDetails } from '../../types/ProductTypes';
import './CardPage.scss';

export const CardPage = () => {
  const { navigate } = useInfoHook();
  const [cart, setCart] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, []);

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const updateQuantify = (productId: string, quantity: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };
        }

        return item;
      });
    });
  };

  const totalCartPrice = cart.reduce((total, item) => {
    const itemPrice = item.priceRegular * (item.quantity || 1);

    return total + itemPrice;
  }, 0);

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

      <div className="card__wraper">
        {cart.length > 0 ? (
          cart.map(product => (
            <ByCardItem
              key={product.id}
              product={product}
              onDelete={removeFromCart}
              onUpdate={updateQuantify}
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="window">
        <h1 className="window__price">{`Total Price: $${totalCartPrice}`}</h1>
        <p className="window__title">{`Tola for ${cart.length} item`}</p>
        <div className="product__line"></div>
        <button className="Checkout">Checkout</button>
      </div>
    </main>
  );
};
