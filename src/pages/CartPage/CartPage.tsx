import { useContext, useState } from 'react';
import cn from 'classnames';
import { BackButton } from '../../components/BackButton/BackButton';
import './CartPage.scss';
import { CartContext } from '../../context/CartContext';
import { Button } from '../../components/Button/Button';

export const CartPage = () => {
  const MAX_QUANTITY = 10;
  const MIN_QUANTITY = 1;

  const {
    cartItems,
    setCartItems,
    totalSum,
    totalQuantity,
  } = useContext(CartContext);

  const changeQuantity = (
    index: number,
    action: 'increase' | 'decrease',
  ) => {
    const cartItem = cartItems[index];

    const newCartItems = [...cartItems];

    newCartItems.splice(index, 1, {
      ...cartItem,
      quantity: action === 'increase'
        ? cartItem.quantity + 1
        : cartItem.quantity - 1,
    });

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const deleteItem = (index: number) => {
    const newCartItems = [...cartItems];

    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const handleCheckoutClick = () => {
    setIsCheckoutClicked(true);

    // setTimeout(() => {
    //   setIsCheckoutClicked(false);
    // }, 3000);
  };

  return (
    <div className="CartPage section">
      <div className="CartPage__backButton">
        <BackButton />
      </div>

      <h1 className="CartPage__title">Cart</h1>

      {cartItems.length === 0 && (
        <h2 className="CartPage__title">
          Your cart is empty
        </h2>
      )}

      {cartItems.length > 0 && (
        <div className="CartPage__content">
          <ul className="CartPage__content--list">
            {cartItems.map((item, index) => (
              <li key={item.id}>
                <div className="CartPage__content--list--item List-item">
                  <div className="List-item__left-side">
                    <button
                      type="button"
                      className="List-item__delete-button"
                      onClick={() => deleteItem(index)}
                      data-cy="cartDeleteButton"
                    >
                      <img
                        src="icons/close.svg"
                        alt="delete item"
                      />
                    </button>

                    <div className="List-item__image">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    </div>

                    <div className="List-item__title">
                      {item.product.name}
                    </div>
                  </div>

                  <div className="List-item__right-side">
                    <div className="List-item__quantity">
                      <Button
                        variant="minus"
                        disabled={item.quantity === MIN_QUANTITY}
                        className="List-item__quantity--button"
                        onClick={() => changeQuantity(index, 'decrease')}
                      />

                      {item.quantity}

                      <Button
                        variant="plus"
                        disabled={item.quantity === MAX_QUANTITY}
                        className="List-item__quantity--button"
                        onClick={() => changeQuantity(index, 'increase')}
                      />
                    </div>

                    <h2 className="List-item__price">
                      {`$${item.product.price}`}
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="CartPage__content--sum Total-block">
            <h1>
              {`$${totalSum}`}
            </h1>

            <p
              className="Total-block__total"
              data-cy="productQauntity"
            >
              {totalQuantity === 1
                ? `Total for ${totalQuantity} item`
                : `Total for ${totalQuantity} items`}
            </p>

            <Button
              variant="cart"
              className="Total-block__button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </Button>

            <p
              className={cn(
                'Total-block__error',
                { 'Total-block__error--visible': isCheckoutClicked },
              )}
            >
              We are sorry, but this feature is not implement yet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
