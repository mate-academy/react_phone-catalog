import { useNavigate } from 'react-router';
import { CartList } from '../components/CartList';
import ArrowLeft from '/src/assets/icons/arrow-left.svg?react';
import { FC } from 'react';

export const CartPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-[4px] mt-[40px]"
      >
        <ArrowLeft className="size-[16px] fill-primary" />
        <span className="text-small text-secondary">Back</span>
      </button>

      <h1 className="mt-[24px] text-h1 sm:mt-[16px]">Cart</h1>

      {true ? (
        <div className="flex flex-col items-center">
          <img
            src="/images/cart-is-empty.webp"
            alt="Cart is empty"
            className="object-contain h-[300px]"
          />
          <h2 className="text-h2 text-primary">Cart is empty</h2>
        </div>
      ) : (
        <CartList products={[]} className="" />
      )}
    </div>
  );
};
