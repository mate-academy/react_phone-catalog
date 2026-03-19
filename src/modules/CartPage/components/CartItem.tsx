import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import { cartActions } from '../../../store/actions';
import Close from '/src/images/icons/close.svg?react';
import Minus from '/src/images/icons/minus.svg?react';
import Plus from '/src/images/icons/plus.svg?react';
import { Button } from '../../shared/components/ui/Button/Button';
import type { FC } from 'react';
import type { CartProduct } from '../../../types';
import type { AppDispatch } from '../../../store';

type CartItemProps = {
  product: CartProduct;
  className?: string;
};

export const CartItem: FC<CartItemProps> = ({ product, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, price, image, itemId, quantity } = product;

  const handleRemoveFromCart = () => {
    dispatch(cartActions.removeFromCart(itemId));
  };

  const handleQuantityChange = (newQuantity: number) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(cartActions.changeQuantity({ itemId, quantity: newQuantity }));
  };

  const decreaseDisabled = quantity <= 1;
  const increaseDisabled = quantity >= 100;

  return (
    <div
      className={cn(
        'shadow-elements dark:bg-d-surface1 flex flex-col gap-y-4 p-4 shadow-inner sm:flex-row sm:gap-x-6 sm:p-6 dark:shadow-none',
        className,
      )}
    >
      <div className="flex grow items-center gap-4 sm:gap-6">
        <Button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center"
        >
          <Close className="fill-icons dark:fill-d-icons hover:fill-primary dark:hover:fill-d-white size-4 transition" />
        </Button>
        <Link
          to={`/product/${itemId}`}
          className="h-full max-h-20 w-full max-w-20 p-1.75"
        >
          <img
            src={image}
            alt={name}
            className="block h-full max-h-16.5 w-full max-w-16.5 object-contain"
          />
        </Link>
        <Link
          to={`/product/${itemId}`}
          className="text-body text-primary dark:text-d-white grow transition hover:underline"
        >
          {name}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center">
          <Button
            disabled={decreaseDisabled}
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
            className={cn(
              'shadow-icons disabled:shadow-elements dark:bg-d-surface2 dark:disabled:shadow-d-elements dark:hover:bg-d-icons p-2 shadow-inner disabled:cursor-not-allowed dark:shadow-none dark:disabled:bg-transparent dark:disabled:shadow-inner',
            )}
          >
            <Minus
              className={cn(
                'size-4',
                decreaseDisabled
                  ? 'fill-icons dark:fill-d-icons'
                  : 'fill-primary dark:fill-d-white',
              )}
            />
          </Button>
          <span className="text-body text-primary dark:text-d-white min-w-8 text-center">
            {quantity}
          </span>
          <Button
            disabled={increaseDisabled}
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            className={cn(
              'shadow-icons disabled:shadow-elements dark:bg-d-surface2 dark:disabled:shadow-d-elements dark:hover:bg-d-icons p-2 shadow-inner disabled:cursor-not-allowed dark:shadow-none dark:disabled:bg-transparent dark:disabled:shadow-inner',
            )}
          >
            <Plus
              className={cn(
                'size-4',
                increaseDisabled
                  ? 'fill-icons dark:fill-d-icons'
                  : 'fill-primary dark:fill-d-white',
              )}
            />
          </Button>
        </div>
        <h3 className="text-h3 text-primary dark:text-d-white flex-[1_0_80px] text-right">
          ${price * quantity}
        </h3>
      </div>
    </div>
  );
};
