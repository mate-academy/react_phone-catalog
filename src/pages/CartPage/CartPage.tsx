import {
  FC,
  useContext,
} from 'react';
import { CartStorageContext } from '../../Context/CartStorageContext';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { CartTotal } from '../../components/CartTotal';
import { NoResults } from '../../components/NoResults';
import { CartProduct } from '../../types/CartProduct';

import './CartPage.scss';

export const CartPage: FC = () => {
  const {
    cartItems,
    setCartItems,
    getTotalPrice,
    getTotalCartItems,
  } = useContext(CartStorageContext);

  const handleQuantityChange = (itemQuantity: number, itemId: string) => {
    if (!setCartItems) {
      return;
    }

    const updatingItem = cartItems
      .find((item: CartProduct) => item.id === itemId);

    if (!updatingItem) {
      return;
    }

    const startIndex = cartItems.indexOf(updatingItem);

    const updatingCartItems = [...cartItems];

    updatingCartItems
      .splice(startIndex, 1, { ...updatingItem, quantity: itemQuantity });

    setCartItems(updatingCartItems);
  };

  const handleRemoveFromCart = (itemId: string) => {
    if (!setCartItems) {
      return;
    }

    const filteredItems = cartItems
      .filter((item: CartProduct) => item.id !== itemId);

    setCartItems(filteredItems);
  };

  return (
    <div
      className="
      main__cart-page
      main__cart-page--width
      products-page
      cart
      "
    >
      <BackButton />

      {!cartItems.length
        ? (
          <NoResults
            title="Your cart is empty &#x1F614;"
            imageUrl="/new/img/empty_cart.jpg"
          />
        ) : (
          <div className="cart__info-container">
            <div className="cart__items-container">
              {cartItems.map((item: CartProduct) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onQuantityChange={handleQuantityChange}
                  onItemRemove={handleRemoveFromCart}
                />
              ))}
            </div>

            <CartTotal
              totalPrice={getTotalPrice()}
              totalItems={getTotalCartItems && getTotalCartItems()}
            />
          </div>
        )}
    </div>
  );
};
