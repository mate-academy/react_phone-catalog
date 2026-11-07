import type React from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon/Icon';
import { ButtonIcon } from '../../atoms/Buttons/ButtonIcon';
import { ICONS } from '../../../constants/icons';
import { ProductLink } from '../../atoms/ProductLink/ProductLink';
import cn from 'classnames';

type Props = {
  image: string;
  title: string;
  price: number;
  quantity: number;
  productPath: string;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

export const CartItem: React.FC<Props> = ({
  image,
  title,
  price,
  quantity,
  productPath,
  onRemove,
  onQuantityChange,
}) => {
  const isMinQuantity = quantity <= 1;

  return (
    <article className="dark:bg-surface-1-dark dark:border-none flex min-h-40 w-full flex-col gap-4 bg-white p-4 md:min-h-32 md:flex-row md:items-center md:gap-6 md:p-6 border border-elements">
      <div className="flex min-w-0 items-center md:flex-1">
        <button
          aria-label={`Remove ${title} from cart`}
          className="group grid size-4 shrink-0 place-items-center"
          onClick={onRemove}
          type="button"
        >
          <Icon
            src={ICONS.CLOSE}
            className="size-4 group-hover:bg-primary hover:cursor-pointer"
            isDisabled
          />
        </button>

        <div className="ml-4 flex min-w-0 flex-1 items-center gap-5 md:ml-6">
          <ProductLink
            to={productPath}
            ariaLabel={title}
            className="shrink-0"
          >
            <img
              alt={title}
              className="h-20 w-20 object-contain"
              src={image}
            />
          </ProductLink>

          <ProductLink
            to={productPath}
            className="min-w-0 flex-1 hover:text-secondary"
          >
            <Typography
              level="body"
              className="wrap-break-word"
            >
              {title}
            </Typography>
          </ProductLink>
        </div>
      </div>

      <div className="flex items-center justify-between md:shrink-0 md:gap-6">
        <div className="flex items-center gap-3">
          <ButtonIcon
            className={cn('grid size-8 place-items-center', {
              'dark:bg-surface-1-dark': isMinQuantity,
              'dark:bg-surface-2-dark': !isMinQuantity,
              'hover:cursor-pointer': !isMinQuantity,
            })}
            handleClick={() => onQuantityChange(quantity - 1)}
            isDisabled={isMinQuantity}
            src={ICONS.MINUS}
          />

          <Typography
            level="body"
            className="w-8 text-center"
          >
            {quantity}
          </Typography>

          <ButtonIcon
            className={cn(
              'grid size-8 place-items-center dark:bg-surface-2-dark hover:cursor-pointer',
            )}
            handleClick={() => onQuantityChange(quantity + 1)}
            src={ICONS.PLUS}
          />
        </div>

        <div className="flex w-20 shrink-0 justify-end">
          <Typography
            level="h3"
            className="whitespace-nowrap"
          >
            ${price}
          </Typography>
        </div>
      </div>
    </article>
  );
};
