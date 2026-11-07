import { Typography } from '../../atoms/Typography/Typography';
import { ProductCardSpecs } from '../../molecules/ProductCardSpecs/ProductCardSpecs';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';
import { ProductSelectActions } from '../../molecules/ProductSelectActions/ProductSelectActions';
import type { Spec } from '../../../types/Specifications';
import { SPECIFICATIONS } from '../../../constants/specifications';
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/Product';
import { useAppActions, useAppState } from '../../../store/store';
import { getScreenLabel } from '../../../utils/formatScreen';
import { ProductRating } from '../../atoms/ProductRating/ProductRating';
import { useProductInfo } from '../../../hooks/useProductInfo';

import { useRef } from 'react';

type Props = {
  product: Product;
  className?: string;
  cardHeight?: number;
};

function getSpecifications(product: Product): Spec[] {
  return [
    [SPECIFICATIONS.SCREEN, getScreenLabel(product.screen)],
    [SPECIFICATIONS.CAPACITY, product.capacity],
    [SPECIFICATIONS.RAM, product.ram],
  ];
}

export const ProductCard: React.FC<Props> = ({
  product,
  className = '',
  cardHeight,
}) => {
  const { toggleFavorite, addItemToCart, removeItemFromCart } = useAppActions();
  const hasDiscount = product.priceDiscount;
  const { isLiked, isSelected } = useProductInfo(product.id);

  const imageRef = useRef<HTMLImageElement>(null);

  const getImageRect = () => {
    if (imageRef.current) {
      return imageRef.current.getBoundingClientRect();
    }

    return null;
  };

  const startCartAnimation = useAppState((state) => state.startCartAnimation);

  const handleCartClick = () => {
    const imageRect = getImageRect();
    const cartElement = document.querySelector('[data-cart-target="true"]');

    if (isSelected) {
      removeItemFromCart(product.id);
    } else {
      addItemToCart(product);

      if (imageRect && cartElement) {
        const cartRect = cartElement.getBoundingClientRect();

        startCartAnimation({
          imageSrc: product.images[0],
          start: {
            x: imageRect.x,
            y: imageRect.y,
            width: imageRect.width,
            height: imageRect.height,
          },
          end: {
            x: cartRect.x,
            y: cartRect.y,
            width: cartRect.width,
            height: cartRect.height,
          },
          id: Date.now(),
        });
      }
    }
  };

  return (
    <div
      className={`box-border transform-gpu backface-hidden p-8 flex flex-col gap-2 border dark:bg-surface-1-dark border-elements dark:border-surface-1-dark transition-transform duration-300 ease-in-out hover:scale-105 hover:border-transparent ${className}`}
      style={{ height: cardHeight }}
    >
      <div className="flex-1 min-h-0 flex items-center justify-center w-full">
        <Link
          to={`/${product.category}/${product.id}`}
          className="flex justify-center w-full h-full overflow-hidden"
        >
          <img
            ref={imageRef}
            className="max-h-full max-w-full object-contain "
            src={product.images[0]}
            alt={product.name}
          />
        </Link>
      </div>
      <Link
        to={{
          pathname: `/${product.category}/${product.id}`,
        }}
      >
        <Typography>{product.name}</Typography>
      </Link>
      <div className="mt-1 mb-1">
        <ProductRating product={product} />
      </div>
      <div className="border-b border-elements pb-2">
        {(
          hasDiscount &&
          product.priceRegular &&
          product.priceRegular > product.priceDiscount
        ) ?
          <ProductPrice
            currentPrice={product.priceDiscount}
            oldPrice={product.priceRegular}
          />
        : <ProductPrice
            currentPrice={product.priceRegular || product.priceDiscount}
          />
        }
      </div>

      <ProductCardSpecs specifications={getSpecifications(product)} />
      <ProductSelectActions
        handleSelectClick={handleCartClick}
        handleLikeClick={() => toggleFavorite(product)}
        isSelected={isSelected}
        isLiked={isLiked}
      />
    </div>
  );
};
