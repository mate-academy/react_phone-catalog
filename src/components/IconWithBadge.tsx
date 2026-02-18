import cn from 'clsx';
import Cart from '/src/images/icons/cart.svg?react';
import Favourites from '/src/images/icons/favourites.svg?react';
import type { FC } from 'react';

interface IconWithBadgeProps {
  variant: 'cart' | 'favourites';
  badgeContent: number;
  className?: string;
}

export const IconWithBadge: FC<IconWithBadgeProps> = ({
  variant,
  badgeContent,
  className,
}) => {
  const variants = {
    cart: <Cart className="fill-primary dark:fill-d-white" />,
    favourites: <Favourites className="fill-primary dark:fill-d-white" />,
  };

  return (
    <div className={cn('relative aspect-square', className)}>
      {variants[variant]}
      {badgeContent > 0 && (
        <div
          className={cn(
            'bg-red dark:border-d-black dark:text-d-white absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center rounded-full border border-white text-center text-[9px] leading-none font-semibold tracking-normal text-white',
            className,
          )}
        >
          {badgeContent > 99 ? '99+' : badgeContent}
        </div>
      )}
    </div>
  );
};
