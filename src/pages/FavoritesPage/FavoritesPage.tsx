import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeFromFavorites } from '../../features/favorites/favoritesSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ConfirmationModalFavorites } from '../../components/ConfirmationModalFavorites/ConfirmationModalFavorites';

import s from './FavoritesPage.module.scss';

export function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const confirmDelete = () => {
    if (idToDelete) {
      dispatch(removeFromFavorites(idToDelete));
      setIdToDelete(null);
    }
  };

  return (
    <div className={s.favoritesPage}>
      <Breadcrumbs productName="Favorites" />

      <div className={s.favoritesHeader}>
        <h1>Favorites</h1>
        <p className={s.favoritesCount}>{favorites.length} items</p>
      </div>

      {favorites.length === 0 ? (
        <div className={s.favoritesEmpty}>
          <p>Your favorites list is empty</p>
        </div>
      ) : (
        <div className={s.productsGrid}>
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onRemove={() => setIdToDelete(product.id)}
            />
          ))}
        </div>
      )}

      <ConfirmationModalFavorites
        isOpen={!!idToDelete}
        message="Ви впевнені, що хочете видалити товар з обраного?"
        onConfirm={confirmDelete}
        onCancel={() => setIdToDelete(null)}
      />
    </div>
  );
}

export default FavoritesPage;
