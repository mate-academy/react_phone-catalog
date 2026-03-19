import { Link } from 'react-router-dom';
import cn from 'clsx';
import { Button } from '../../shared/components/ui/Button/Button';
import Favourites from '/src/images/icons/favourites.svg?react';
import FavouritesFilled from '/src/images/icons/favourites-filled.svg?react';
import type { FC } from 'react';
import type { Product } from '../../../types';
import { useCart } from '../../shared/hooks/useCart';
import { useFavourites } from '../../shared/hooks/useFavourites';
import { formatScreen } from '../../shared/utilities/formatScreen';
import { formatMemory } from '../../shared/utilities/formatMemory';
import { useTranslations } from 'use-intl';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image, itemId } =
    product;

  const { isInCart, handleAddToCart } = useCart(product);
  const { isInFavourites, handleToggleFavourite } = useFavourites(product);

  const tSpecs = useTranslations('productDetails.specs');
  const tPD = useTranslations('productDetails');

  return (
    <div className="shadow-elements dark:bg-d-surface1 dark:hover:shadow-d-surface2 flex h-full flex-col gap-2 p-8 shadow-inner transition dark:shadow-none dark:hover:shadow-inner">
      {/* Image */}
      <Link
        to={`/product/${itemId}`}
        className="flex flex-[1_1_auto] justify-center"
      >
        <img
          src={image}
          alt={name}
          // className="mx-auto h-auto max-h-32.5 w-auto max-w-full grow object-cover sm:max-h-49"
          className="object-contain transition hover:scale-110"
        />
      </Link>

      {/* Title */}
      <Link
        to={`/product/${itemId}`}
        className="text-body text-primary dark:text-d-white mt-4 flex-[0_0_auto] transition hover:underline"
      >
        {name}
      </Link>

      {/* Price */}
      <div className="flex flex-[0_0_auto] items-center gap-2">
        <h3 className="text-h3 text-primary dark:text-d-white">${price}</h3>

        <span className="text-secondary dark:text-d-secondary line-through">
          ${fullPrice}
        </span>
      </div>

      {/* Divider */}
      <div className="bg-elements dark:bg-d-elements h-px flex-[0_0_auto]"></div>

      {/* Specs */}
      <ul className="flex flex-[0_0_auto] flex-col gap-2 py-2">
        {[
          { title: tSpecs('screen'), text: formatScreen(screen) },
          { title: tSpecs('builtInMemory'), text: formatMemory(capacity) },
          { title: tSpecs('ram'), text: formatMemory(ram) },
        ].map(({ title, text }) => (
          <li
            key={title}
            className="text-small flex items-center justify-between"
          >
            <span className="text-secondary dark:text-d-secondary">
              {title}
            </span>
            <span className="text-primary dark:text-d-white">{text}</span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-[0_0_auto] gap-2">
        <Button
          onClick={handleAddToCart}
          className={cn(
            'text-buttons flex h-10 w-full flex-[1_1_auto] items-center justify-center transition dark:shadow-none',
            isInCart
              ? 'text-green dark:text-d-white shadow-elements dark:bg-d-surface2 dark:hover:bg-d-icons hover:shadow-primary bg-white shadow-inner'
              : 'bg-primary dark:bg-d-accent hover:shadow-hover-bs dark:hover:bg-d-hover-bs dark:text-d-white text-white hover:shadow-[0_3px_13px_0]',
          )}
        >
          {isInCart ? tPD('addedToCart') : tPD('addToCart')}
        </Button>

        <Button
          onClick={handleToggleFavourite}
          className={cn(
            'hover:shadow-primary flex aspect-square size-10 flex-[0_0_auto] items-center justify-center p-3 shadow-inner transition',
            isInFavourites
              ? 'shadow-elements dark:shadow-d-elements dark:hover:shadow-d-icons'
              : 'shadow-icons dark:bg-d-surface2 dark:hover:bg-d-icons dark:shadow-none',
          )}
        >
          {isInFavourites ? (
            <FavouritesFilled className="fill-red dark:fill-d-red" />
          ) : (
            <Favourites className="fill-primary dark:fill-d-white" />
          )}
        </Button>
      </div>
    </div>
  );
};
