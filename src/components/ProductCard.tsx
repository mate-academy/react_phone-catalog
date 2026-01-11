import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import { cartActions, favouritesActions } from '../store/actions';
import { cartSelectors } from '../selectors/cartSelectors';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { Button } from './Button';
import Favourites from '/src/assets/icons/favourites.svg?react';
import FavouritesFilled from '/src/assets/icons/favourites-filled.svg?react';
import type { FC } from 'react';
import type { Product } from '../types';
import type { RootState } from '../store';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const { name, fullPrice, price, screen, capacity, ram, image, itemId } =
    product;

  const isInCart = useSelector((state: RootState) =>
    cartSelectors.selectById(state, itemId),
  );

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(product));
  };

  const isFavourite = useSelector((state: RootState) =>
    favouritesSelectors.selectById(state, itemId),
  );

  const handleToggleFavourite = () => {
    dispatch(favouritesActions.toggleFavourite(product));
  };

  return (
    <div className="flex h-full flex-col gap-2 p-8 shadow-inner shadow-elements transition">
      <Link to={`/product/${itemId}`} className="block">
        <img
          src={image}
          alt={name}
          className="mx-auto h-auto w-auto max-w-full grow object-cover max-h-32.5 sm:max-h-49"
        />
      </Link>

      <Link
        to={`/product/${itemId}`}
        className="pt-4 text-body hover:underline"
      >
        {name}
      </Link>

      <div className="flex items-center gap-2">
        <h3 className="text-h3 text-primary">${price}</h3>

        <span className="line-through text-secondary">${fullPrice}</span>
      </div>

      <div className="h-px bg-elements"></div>

      <div className="flex flex-col gap-2 py-2">
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

      <div className="flex grow items-end h-10 gap-2">
        <Button
          onClick={handleAddToCart}
          className={cn(
            'flex justify-center items-center grow py-2.5 text-buttons transition',
            {
              'bg-primary text-white hover:shadow-[0_3px_13px_0] hover:shadow-hover-bs':
                !isInCart,
              'bg-white text-green shadow-inner shadow-elements hover:shadow-primary':
                isInCart,
            },
          )}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          onClick={handleToggleFavourite}
          className={cn(
            'aspect-square p-3 shadow-inner transition hover:shadow-primary',
            {
              'shadow-icons': true,
              'shadow-elements': false,
            },
          )}
        >
          {isFavourite ? (
            <FavouritesFilled className="fill-red" />
          ) : (
            <Favourites className="fill-primary" />
          )}
        </Button>
      </div>
    </div>
  );
};
