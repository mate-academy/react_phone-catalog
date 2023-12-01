/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { typographyStyle } from '../CustomStyles/Typography';
import { appContext } from '../Contexts/AppContext';
import { CartItemCard } from '../components/CartItem';
import { TextButton } from '../components/TextButton';

export const Cart = () => {
  const { cartItems, setCartItems } = useContext(appContext);
  const [errorMessage, setErrorMessage] = useState('');

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (prev, acc) => (acc.product.price + prev) * acc.quantity,
      0,
    );

    return totalPrice;
  };

  const getTotalItems = () => {
    const totalPrice = cartItems.reduce((prev, acc) => acc.quantity + prev, 0);

    return totalPrice;
  };

  const handleCheckout = () => {
    setErrorMessage('We are sorry, but this feature is not implemented yet');
  };

  const addOneToCartItem = (cartItemIndex: number) => {
    const newItems = [...cartItems];

    newItems[cartItemIndex].quantity += 1;
    setCartItems(newItems);
  };

  const removeCartItem = (cartItemIndex: number) => {
    const newItems = [
      ...cartItems.slice(0, cartItemIndex),
      ...cartItems.slice(cartItemIndex + 1, cartItems.length),
    ];

    setCartItems(newItems);
  };

  const removeOneFromCartItem = (cartItemIndex: number) => {
    const newItems = [...cartItems];

    newItems[cartItemIndex].quantity -= 1;

    if (newItems[cartItemIndex].quantity < 1) {
      removeCartItem(cartItemIndex);

      return;
    }

    setCartItems(newItems);
  };

  return (
    <div className="col-span-full">
      <hr className="col-span-full h-10 border-0" />

      <Link
        className={`flex w-min items-center gap-1 text-Secondary ${typographyStyle.smallText}`}
        to="/"
      >
        <img src="./Icons/Chevron (Arrow Left).svg" alt="back" />
        Back
      </Link>

      <hr className="col-span-full h-10 border-0" />

      <h1 className={`col-span-full capitalize ${typographyStyle.h1}`}>cart</h1>

      <hr className="col-span-full h-6 border-0" />

      {!cartItems.length ? (
        <div className="col-span-full">
          Products you chose to buy will appear here
        </div>
      ) : (
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-4">
            {!!cartItems.length
              && cartItems.map((item, i) => (
                <CartItemCard
                  increment={() => addOneToCartItem(i)}
                  decrement={() => removeOneFromCartItem(i)}
                  removeProduct={() => removeCartItem(i)}
                  key={item.id}
                  cartItem={item}
                />
              ))}
          </div>

          <div className="h-[206px] w-[368px] border border-Elements p-6">
            <div className="flex flex-col items-center">
              <p className={typographyStyle.h1}>
                $
                {`${getTotalPrice()}`}
              </p>
              <p className={`text-Secondary ${typographyStyle.smallText}`}>
                {`Total for ${getTotalItems()} ${
                  cartItems.length === 1 ? 'item' : 'items'
                }`}
              </p>
            </div>

            <hr className="my-6" />

            <div className="relative h-12 w-full">
              <div className="absolute bottom-full text-xs">{errorMessage}</div>
              <TextButton onClick={handleCheckout}>Checkout</TextButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
