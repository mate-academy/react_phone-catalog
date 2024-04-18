import './favoritesPage.scss';
import { useContext } from 'react';
import { ProductList } from '../../components/ProductList';
import { FavoritesContext } from
  '../../components/ContextProviders/ContextProviders';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/Footer';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <div className="favoritesPage">
        <div className="container">
          <Breadcrumbs />
          <h1 className="favoritesPage__title">Favourites</h1>
          <p className="favoritesPage__description">{`${favorites.length} items`}</p>
          <ProductList dataProducts={favorites} />
        </div>
      </div>
      <Footer />
    </>
  );
};
