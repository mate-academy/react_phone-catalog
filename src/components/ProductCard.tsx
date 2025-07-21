import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Favourites from '/src/assets/icons/favourites.svg?react';
import FavouritesFilled from '/src/assets/icons/favourites-filled.svg?react';
import { Accessory, Phone, Tablet } from '../types';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { name, priceRegular, priceDiscount, screen, capacity, ram, images } =
    product;

  return (
    <li className="col-span-4 sm:col-span-6 md-max:col-span-4 lg:col-span-6 flex flex-col gap-2 p-8 shadow-inner shadow-elements">
      <Link to={product.id} className="block">
        <img
          className="block max-w-full max-h-[130px] md:max-h-[196px] w-auto h-auto mx-auto"
          src={images[0]}
          alt="Product Card Image"
        />
      </Link>

      <Link to={product.id} className="block hover:underline">
        <div className="pt-[16px] body-text">{name}</div>
      </Link>

      <div className="flex items-center gap-2">
        <h3 className="text-primary">${priceDiscount}</h3>

        <span className="font-semibold text-[22px] leading-7 text-secondary line-through">
          ${priceRegular}
        </span>
      </div>

      <div className="h-[1px] bg-elements"></div>

      <div className="flex flex-col gap-2 py-2">
        <div className="flex justify-between small-text">
          <span className="text-secondary">Screen</span>
          <span className="text-primary">{screen}</span>
        </div>
        <div className="flex justify-between small-text">
          <span className="text-secondary">Capacity</span>
          <span className="text-primary">{capacity}</span>
        </div>
        <div className="flex justify-between small-text">
          <span className="text-secondary">RAM</span>
          <span className="text-primary">{ram}</span>
        </div>
      </div>

      <div className="flex gap-2 h-10">
        <button
          className={cn(
            'flex justify-center items-center grow py-[10px] buttons transition',
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
    </li>
  );
};
