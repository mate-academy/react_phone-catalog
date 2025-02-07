import { PathNavigation } from '../../../shared/components/PathNavigation';
import styles from './FavouritesPage.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { ProductsDisplay } from '../../../shared/components/ProductsDisplay';
import React, { useRef } from 'react';
// eslint-disable-next-line max-len
import { useFavourites } from '../../../shared/components/Contexts/FavouritesContext';
import { LoadingStatus } from '../../../shared/types/enums';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();
  const { favouritesTitle } = useLanguage().localeTexts;
  const favouritesToShow = useRef(favourites);

  return (
    <>
      <PathNavigation path={[favouritesTitle]} />

      <main className={styles.FavouritesPage}>
        <h1 className={styles.Title}>{favouritesTitle}</h1>

        <ProductsDisplay
          products={favouritesToShow.current}
          showSearch
          loadingStatus={
            favouritesToShow.current.length
              ? LoadingStatus.Success
              : LoadingStatus.NoData
          }
          className={styles.ProductsDisplay}
        />
      </main>
    </>
  );
};
