import cn from 'clsx';
import { FC } from 'react';
import { Product } from '../types';

type CheckoutProps = {
  products: Product[];
  className: string;
};

export const Checkout: FC<CheckoutProps> = ({ products, className }) => {
  const sum = products
    .map(product => product.price)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div
      className={cn(
        'flex flex-col gap-4 p-6 shadow-inner shadow-elements',
        className,
      )}
    >
      <div className="">
        <h2 className="text-center text-h2 text-primary">${sum}</h2>
        <p className="text-center text-body text-secondary">
          Total for {products.length} {products.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      <div className="my-[-0.5px]  border-[0.5px] border-elements"></div>
      <button className="py-[13.5px] bg-primary text-buttons text-white">
        Checkout
      </button>
    </div>
  );
};
