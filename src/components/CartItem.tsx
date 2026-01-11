import { Link } from 'react-router-dom';
import cn from 'clsx';
import Close from '/src/assets/icons/close.svg?react';
import Minus from '/src/assets/icons/minus.svg?react';
import Plus from '/src/assets/icons/plus.svg?react';
import { Button } from './Button';
import { FC } from 'react';
import { Product } from '../types';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/actions';

type CartItemProps = {
  product: Product;
  className?: string;
};

export const CartItem: FC<CartItemProps> = ({ product, className }) => {
  const dispatch = useDispatch();
  const { name, price, image, itemId } = product;

  const handleRemoveFromCart = () => {
    dispatch(cartActions.removeFromCart(itemId));
  };

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:gap-x-6 gap-y-4 p-4 sm:p-6 shadow-inner shadow-elements',
        className,
      )}
    >
      <div className="grow flex items-center gap-4 sm:gap-6">
        <Button onClick={handleRemoveFromCart} className="">
          <Close className="size-4 fill-icons" />
        </Button>
        <Link
          to={`/product/${itemId}`}
          className="grow flex items-center gap-4 sm:gap-6"
        >
          <div className="max-w-20 max-h-20 w-full h-full p-1.75">
            <img
              src={image}
              alt={name}
              className="block max-w-16.5 max-h-16.5 w-full h-full object-contain"
            />
          </div>
          <div className="grow text-body text-primary">{name}</div>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center">
          <button className="p-2 shadow-inner shadow-icons">
            <Minus />
          </button>
          <span className="min-w-8 text-center text-body text-black">1</span>
          <button className="p-2 shadow-inner shadow-icons">
            <Plus />
          </button>
        </div>
        <h3 className="pl-7.5 text-h3 text-primary">${price}</h3>
      </div>
    </div>
  );
};
