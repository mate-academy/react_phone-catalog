/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useContext } from 'react';
import { NavMap } from '../../components/NavMap';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import { PageTitle } from '../../components/PageTitle';
import { Styles } from '../../types/Styles';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorText } from '../../types/ErrorText';

const styles: Styles = require('./FavoritesPage.module.scss');

const {
  FavoritesPage: page,
  FavoritesPage__title: title,
  FavoritesPage__NavMap: navMap,
  FavoritesPage__ProductsList: productsList,
  FavoritesPage__ErrorMessage: error,
} = styles;

export const FavoritesPage: FC = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className={page}>
      <NavMap
        className={navMap}
        navItems={['Favorites']}
      />

      <PageTitle
        className={title}
        itemsCount={favorites.length}
      >
        Favorites
      </PageTitle>

      {favorites.length
        ? (
          <ProductsList
            products={favorites}
            className={productsList}
          />
        ) : (
          <ErrorMessage
            message={ErrorText.EmptyFavorites}
            isBig
            className={error}
          />
        )}
    </main>
  );
};
