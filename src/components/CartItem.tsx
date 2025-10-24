import cn from 'clsx';
import Close from '/src/assets/icons/close.svg?react';
import { Button } from './Button';
import { FC } from 'react';
import { Accessory, Phone, Tablet } from '../types';

type CartItemProps = {
  product: Phone | Tablet | Accessory;
  className?: string;
};

export const CartItem: FC<CartItemProps> = ({ product, className }) => {
  const { name, priceDiscount, images } = product;

  return (
    <div
      className={cn(
        'flex justify-between gap-x-[24px] shadow-inner shadow-elements',
        className,
      )}
    >
      <Button className="">
        <Close className="size-[16px] fill-icons" />
      </Button>
      <img
        src={images[0]}
        alt={name}
        className="mx-auto block h-auto w-auto max-w-full max-h-[130px] sm:max-h-[196px]"
      />
      <div className="text-body text-primary">{name}</div>
      <div className=""></div>
      <h3 className="text-h3 text-primary">{priceDiscount}</h3>
    </div>
  );
};
