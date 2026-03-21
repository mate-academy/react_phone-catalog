import { ProductList } from '../ProductsPage/components/ProductList';
import { FC } from 'react';
import { useTranslations } from 'use-intl';
import { NoResults } from '../shared/components/NoResults';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useFavourites } from '../shared/hooks/useFavourites';

export const FavouritesPage: FC = () => {
  const t = useTranslations('favourites');
  const { filteredFavourites, totalFavourites, query } = useFavourites();

  if (totalFavourites < 1) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 xl:mt-14">
        <img
          src="images/product-not-found.webp"
          alt={t('empty')}
          className="w-full max-w-1/2 sm:max-w-1/3"
        />
        <h2 className="text-h2 text-primary dark:text-d-white text-center">
          {t('empty')}
        </h2>
      </div>
    );
  }

  const visibleCount = filteredFavourites.length;

  return (
    <div>
      <Breadcrumbs
        className="mt-6"
        routes={[
          {
            path: '/favourites',
            breadcrumb: t('title'),
          },
        ]}
      />
      <h1 className="text-h1 text-primary dark:text-d-white mt-6 sm:mt-10">
        {t('title')}
      </h1>
      <p className="text-body text-secondary dark:text-d-secondary mt-2">
        {t('itemCount', { count: visibleCount })}
      </p>

      {query && visibleCount === 0 ? (
        <NoResults text={t('noResults')} />
      ) : (
        <ProductList products={filteredFavourites} className="mt-6" />
      )}
    </div>
  );
};
