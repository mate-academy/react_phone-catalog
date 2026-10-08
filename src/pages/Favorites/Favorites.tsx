import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';

export const Favorites = () => {
  const { state } = useFavorites();
  const { t } = useLanguage();

  return (
    <section>
      <h1>{t('favorites')}</h1>

      {state.items.length === 0 ? (
        <p>{t('favoritesEmpty')}</p>
      ) : (
        <ProductsList products={state.items} />
      )}
    </section>
  );
};
