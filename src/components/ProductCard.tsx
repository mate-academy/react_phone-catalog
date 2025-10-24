import { FC } from 'react';
import { Link } from 'react-router';
import cn from 'clsx';
import Favourites from '/src/assets/icons/favourites.svg?react';
import FavouritesFilled from '/src/assets/icons/favourites-filled.svg?react';
import { Product } from '../types';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image } = product;

  return (
    <Link
      to={`/product/${product.itemId}`}
      className="flex h-full flex-col shadow-inner gap-y-[8px] p-[32px] shadow-elements"
    >
      <img
        src={image}
        alt={name}
        className="mx-auto h-auto w-auto max-w-full grow object-cover max-h-[130px] sm:max-h-[196px]"
      />

      <div className="pt-[16px] text-body hover:underline">{name}</div>

      <div className="flex items-center gap-[8px]">
        <h3 className="text-h3 text-primary">${price}</h3>

        <span className="line-through text-secondary">${fullPrice}</span>
      </div>

      <div className="h-[1px] bg-elements"></div>

      <div className="flex flex-col gap-[8px] py-[8px]">
        <div className="flex justify-between text-small">
          <span className="text-small text-secondary">Screen</span>
          <span className="text-primary">{screen}</span>
        </div>
        <div className="flex justify-between text-small">
          <span className="text-small text-secondary">Capacity</span>
          <span className="text-primary">{capacity}</span>
        </div>
        <div className="flex justify-between text-small">
          <span className="text-small text-secondary">RAM</span>
          <span className="text-primary">{ram}</span>
        </div>
      </div>

      <div className="flex h-10 gap-[8px]">
        <button
          type="button"
          className={cn(
            'flex justify-center items-center grow py-[10px] text-buttons transition',
            {
              'bg-primary text-white hover:shadow-[0_3px_13px_0] hover:shadow-hover-bs': true,
              'bg-white text-green shadow-inner shadow-elements hover:shadow-primary': false,
            },
          )}
        >
          Add to cart
        </button>

        <button
          className={cn(
            'aspect-square p-3 shadow-inner transition hover:shadow-primary',
            {
              'shadow-icons': true,
              'shadow-elements': false,
            },
          )}
        >
          {true ? (
            <Favourites className="fill-primary" />
          ) : (
            <FavouritesFilled className="fill-red" />
          )}
        </button>
      </div>
    </Link>
  );
};
