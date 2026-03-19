import { useSelector } from 'react-redux';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { ProductList } from '../components/Product/ProductList';
import { FC } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTranslations } from 'use-intl';

export const FavouritesPage: FC = () => {
  const favouritesProducts = useSelector(favouritesSelectors.selectAll);
  const totalFavourites = favouritesProducts.length;
  const t = useTranslations('favourites');

  if (!favouritesProducts || totalFavourites < 1) {
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
        {t('itemCount', { count: totalFavourites })}
      </p>

      <ProductList products={favouritesProducts} className="mt-6" />
    </div>
  );
};
