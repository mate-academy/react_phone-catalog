import { useState } from 'react';
// Використовуємо кастомні хуки замість стандартних
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeFromFavorites } from '../../features/favorites/favoritesSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ConfirmationModalFavorites } from '../../components/ConfirmationModalFavorites/ConfirmationModalFavorites';
import './FavoritesPage.scss';

export function FavoritesPage() {
  const dispatch = useAppDispatch();
  // Тепер тип стейту підтягується автоматично
  const favorites = useAppSelector(state => state.favorites.items);

  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const confirmDelete = () => {
    if (idToDelete) {
      dispatch(removeFromFavorites(idToDelete));
      setIdToDelete(null);
    }
  };

  return (
    <div className="favorites-page">
      <Breadcrumbs productName="Favorites" />

      <div className="favorites-page__header">
        <h1>Favorites</h1>
        <p className="favorites-page__count">{favorites.length} items</p>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-page__empty">
          <p>Your favorites list is empty</p>
        </div>
      ) : (
        <div className="products-grid">
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              // Переконайся, що в ProductCard цей пропс обробляється!
              onRemove={() => setIdToDelete(product.id)}
            />
          ))}
        </div>
      )}

      {/* Модалка */}
      {idToDelete && (
        <ConfirmationModalFavorites
          isOpen={!!idToDelete} // Додай цей пропс, якщо модалка його очікує
          message="Ви впевнені, що хочете видалити товар з обраного?"
          onConfirm={confirmDelete}
          onCancel={() => setIdToDelete(null)}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
