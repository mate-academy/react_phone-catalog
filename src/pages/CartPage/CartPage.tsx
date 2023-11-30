import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartStorageContext } from '../../context/CartStorageContext';
import { CartProduct } from '../../types/CartProduct';
import { NoResults } from '../../components/NoResult/NoResult';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartTotalPrice } from '../../components/CartTotalPrice/CartTotalPrice';

export const CartPage: FC = () => {
  const {
    cartItems,
    setCartItems,
    getTotalPrice,
    getTotalCartItems,
  } = useContext(CartStorageContext);

  const handleCountChange = (itemCount: number, itemId: string) => {
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
      .splice(startIndex, 1, { ...updatingItem, quantity: itemCount });

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

  const navigate = useNavigate();

  const handeBackNavigateClick = () => {
    navigate(-1);
  };

  const handleKeyBack = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handeBackNavigateClick();
    }
  };

  return (
    <div className="
      main__products-page main__products-page-width products-page cart"
    >
      <div className="products-page__back-button back-button">
        <div className="back-button__arrow" />

        <div
          onClick={handeBackNavigateClick}
          className="back-button__button"
          role="button"
          tabIndex={0}
          aria-label="back-button"
          onKeyDown={handleKeyBack}
          data-cy="backButton"
        >
          Back
        </div>
      </div>

      {!cartItems.length ? (
        <NoResults title="Your cart is empty" imageUrl="img/emptyCart.jpg" />
      ) : (
        <div className="cart__info-container">
          <div className="cart__items-container">
            <h1 className="cart__items-title">Cart</h1>
            {cartItems.map((item: CartProduct) => (
              <CartItem
                key={item.id}
                id={item.id}
                count={item.quantity}
                name={item.name}
                price={item.price}
                image={item.imageUrl}
                onCountChange={handleCountChange}
                onItemRemove={handleRemoveFromCart}
              />
            ))}
          </div>

          <CartTotalPrice
            totalPrice={getTotalPrice()}
            totalCartItems={getTotalCartItems && getTotalCartItems()}
          />
        </div>
      )}
    </div>
  );
};
