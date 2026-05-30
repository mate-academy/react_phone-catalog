import { useContext } from 'react';
import { StatesContext } from '../../base/store/GlobalStateProvider';
import { NavigationPath } from '../../components/Navigation/Navigation';
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';

export const FavoritesPage = () => {
  const { favorites } = useContext(StatesContext);

  return (
    <section className="favorites-page">
      <NavigationPath firstLevel={'favorites'} />
      <CategoryTitle title={'Favorites'} productsCount={favorites.length} />
      <ProductGrid productsArray={favorites} />
    </section>
  );
};
