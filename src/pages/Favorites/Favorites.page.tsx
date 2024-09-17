// eslint-disable-next-line max-len
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle.component';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
// eslint-disable-next-line max-len
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.component';
import { StatesContext } from '../../store/GlobalStateProvider';
import { useContext } from 'react';

export const FavoritesPage = () => {
  const { favorites } = useContext(StatesContext);

  return (
    <section className="catalog-page">
      <NavigationPath id={'favorites'} />
      <CategoryTitle title={'Favorites'} productsCount={favorites.length} />
      <ProductGrid productsArray={favorites} />
    </section>
  );
};
