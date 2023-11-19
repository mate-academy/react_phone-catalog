/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { typographyStyle } from '../CustomStyles/Typography';
import { appContext } from '../Contexts/AppContext';
import { CartItem } from '../Components/CartItem';
import { TextButton } from '../Components/TextButton';

export const Cart = () => {
  const { cartItems } = useContext(appContext);

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (prev, acc) => (acc.product.price + prev) * acc.quantity,
      0,
    );

    return totalPrice;
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
              && cartItems.map(item => (
                <CartItem key={item.product.id} product={item.product} />
              ))}
          </div>

          <div className="h-[206px] w-[368px] border border-Elements p-6">
            <div className="flex flex-col items-center">
              <p className={typographyStyle.h1}>{`$${getTotalPrice()}`}</p>
              <p className={`text-Secondary ${typographyStyle.smallText}`}>
                {`Total for ${cartItems.length} ${
                  cartItems.length === 1 ? 'item' : 'items'
                }`}
              </p>
            </div>

            <hr className="my-6" />

            <div className="h-12 w-full">
              <TextButton>Checkout</TextButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
