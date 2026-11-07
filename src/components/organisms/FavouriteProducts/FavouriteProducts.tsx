import { useMemo } from 'react';
import type { FavouriteProduct } from '../../../types/FavouriteProduct';
import { Typography } from '../../atoms/Typography/Typography';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  favouriteProducts: Map<string, FavouriteProduct>;
};

export const FavouriteProducts: React.FC<Props> = ({ favouriteProducts }) => {
  const productsList = useMemo(
    () => [...favouriteProducts.values()],
    [favouriteProducts],
  );

  return (
    <div
      className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-12
    lg:grid-cols-24"
    >
      {favouriteProducts.size === 0 ?
        <div className="relative col-span-full flex w-full justify-center">
          <div className="relative w-fit pr-21 sm:pr-26 md:pr-28 lg:pr-32">
            <Typography
              className="text-primary text-center dark:text-white"
              level="h2"
            >
              Add products to your favourites
            </Typography>

            <img
              src="/img/empty-favourites.png"
              alt="No favourites icon"
              className="absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rotate-12 object-contain sm:h-26 sm:w-26 md:h-28 md:w-28 lg:h-32 lg:w-32"
            />
          </div>
        </div>
      : productsList.map((product) => {
          return (
            <ProductCard
              className="col-span-4 h-110 sm:col-span-2 md:col-span-6 md:h-126.5 em:col-span-4 lg:col-span-6"
              key={`${product.category}-${product.id}`}
              product={product}
            />
          );
        })
      }
    </div>
  );
};
