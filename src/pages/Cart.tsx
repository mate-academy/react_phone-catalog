import { useSelector } from 'react-redux';
import { cartSelectors } from '../selectors/cartSelectors';
import { BackButton } from '../components/BackButton';
import { CartList } from '../components/CartList';
import { Checkout } from '../components/Checkout';
import { FC } from 'react';

export const CartPage: FC = () => {
  const cartProducts = useSelector(cartSelectors.selectAll);
  const isEmpty = cartProducts.length === 0;

  return (
    <div className="">
      <BackButton className="mt-10" />

      <h1 className="mt-6 text-h1 sm:mt-4">Cart</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center">
          <img
            src="/images/cart-is-empty.webp"
            alt="Cart is empty"
            className="object-contain h-75"
          />
          <h2 className="text-h2 text-primary">Cart is empty</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-8 xl:pageGrid mt-8">
          <CartList products={cartProducts} className="xl:col-span-16" />
          <Checkout products={cartProducts} className="xl:col-span-8 h-fit" />
        </div>
      )}
    </div>
  );
};
