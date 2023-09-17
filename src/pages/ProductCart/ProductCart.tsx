/* eslint-disable no-restricted-syntax */
import '../../styles/pages/ProductCart/ProductCart.scss';

import { Link } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { Product } from '../../types/product';
import { Item } from '../../types/storageItem';
import { Storage } from '../../types/storages';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartTotal } from '../../components/CartTotal';

export const ProductCart = () => {
  const [cart, setCart] = useLocalStorage<Item<Product>[]>([], Storage.CART);

  const handleDiscardItem = (item: Item<Product>) => {
    setCart(prev => {
      return prev.filter(prod => prod.value.id !== item.value.id);
    });
  };

  const handleQuantityDecrease = (item: Item<Product>) => {
    const newCart = [...cart];

    for (const product of newCart) {
      if (product.value.id === item.value.id) {
        product.quantity -= 1;
      }
    }

    setCart(newCart);
  };

  const handleQuantityIncrease = (item: Item<Product>) => {
    const newCart = [...cart];

    for (const product of newCart) {
      if (product.value.id === item.value.id) {
        product.quantity += 1;
      }
    }

    setCart(newCart);
  };

  const [totalPrice, itemsQuantity] = calcTotalPrice(cart);

  return (
    <main className="cart">
      <Link to="/home" className="cart__back-link">
        Back
      </Link>

      <h1 className="cart__title">
        Cart
      </h1>

      {cart.length === 0 ? (
        <h1 className="products-page__sad-message">Your cart is empty</h1>
      ) : (
        <div className="cart__content-container">
          <div className="cart__cart-items">
            {cart.map(item => (
              <CartItem
                item={item}
                onQuantityDecrease={item.quantity <= 1
                  ? handleDiscardItem
                  : handleQuantityDecrease}
                onQuantityIncrease={handleQuantityIncrease}
                onDiscardItem={handleDiscardItem}
              />
            ))}
          </div>

          <div className="cart_cart-total">
            <CartTotal price={totalPrice} quantity={itemsQuantity} />
          </div>
        </div>
      )}
    </main>
  );
};
