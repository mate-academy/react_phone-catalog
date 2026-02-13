import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ListOfFavorite } from './ListOfFavorite';
import { ProductsContext } from '../../context/ProductContext';
import { Header } from '../Catalog/Header';
import { HeaderFavorites } from './Header';
import { EmptyFavorites } from './Empty';

export const Favorites = () => {
  const location = useLocation().pathname.replace('/', '');
  const { products } = useContext(ProductsContext);
  const { onToggleLike, favoritesProducts } = useContext(ProductsContext);

  const filterFavoriteProducts = products.filter(id => {
    return favoritesProducts.some(likeId => {
      return likeId === id.itemId;
    });
  });

  return (
    <main className="catalog">
      <HeaderFavorites />
      {filterFavoriteProducts.length > 0 && (
        <>
          <Header location={location} product={filterFavoriteProducts} />
          <ListOfFavorite
            filterFavoriteProducts={filterFavoriteProducts}
            onToggleLike={onToggleLike}
          />
        </>
      )}

      {filterFavoriteProducts.length === 0 && <EmptyFavorites />}
    </main>
  );
};
