import React from 'react';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DefaultValues } from '../../enums/DefaultValues';
import { SearchParam } from '../../enums/SearchFields';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { ProductList } from '../shared/organisms/ProductList';
import { Heading } from '../shared/molecules/Heading';
import { PageMessage } from '../shared/molecules/PageMessage';
import { Breadcrumbs } from '../Breadcrumbs';

export const FavouritesPage: React.FC = () => {
  const { favourites: products } = useAppSelector(state => state.favourites);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParam.Query) || DefaultValues.Query;
  const favourites = useFilteredProducts(products, '', query, '');

  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs showSearch={favourites.length > 0} />
      <div className={styles.page}>
        <div className={styles.page__content}>
          <Heading
            title={t('favourites.title')}
            {...(favourites.length > 0 && {
              subtitle: t('catalog.subtitle.items', {
                count: favourites.length,
              }),
            })}
          />

          {favourites.length > 0 ? (
            <ProductList list={favourites} />
          ) : (
            <PageMessage title={`${t('favourites.empty')}💔`} />
          )}
        </div>
      </div>
    </>
  );
};
