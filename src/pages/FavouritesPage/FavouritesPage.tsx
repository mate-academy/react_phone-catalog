import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FavouritesTemplate } from '@/components/templates';

import { useFavouritesStore } from '@/entities/favourites';
import { useProductByIds } from '@/entities/product';
import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

export const FavouritesPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('favorites')} | NICE GADGETS`;
  }, [t]);

  const savedFavourites = useFavouritesStore((state) => state.favourites);

  const favouriteIds = savedFavourites.map((product) => product.id);

  const {
    data: products = [],
    isPending,
    isError,
  } = useProductByIds(favouriteIds);

  const { data: ratings = [] } = useProductRatings();

  const ratingsMap = useMemo(
    () => new Map(ratings.map((item) => [item.namespaceId, item])),
    [ratings],
  );

  const favourites = useMemo(() => {
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );

    return savedFavourites
      .map((product) => productsById.get(product.id))
      .filter((product) => product !== undefined);
  }, [products, savedFavourites]);

  if (isError) {
    return <h2>{t('unableToLoadFavourites')}</h2>;
  }

  return (
    <FavouritesTemplate
      data={favourites}
      ratingsMap={ratingsMap}
      count={savedFavourites.length}
      isLoading={favouriteIds.length > 0 && isPending}
    />
  );
};
