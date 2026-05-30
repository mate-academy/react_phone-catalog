import { useCategories } from '../../store/CategoryContext';
import { useFavorites } from '../../store/FavoriteContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import { CategoryType } from '../shared/types/CategoryType';

export const FavoritesPage = () => {
  const { categories } = useCategories();
  const { favorites } = useFavorites();
  const itemsPerPage = favorites.length;
  const category: CategoryType | undefined = categories.find(
    item => item.page === 'favorites',
  );

  return (
    <section className="App__section" id="phones">
      <div className="App__section-content App__section-content">
        <Breadcrumbs category={category} />
        {category && <h1 className="App__h App__h--h1">{category.fullName}</h1>}

        <div className="App__product_counter">{`${favorites.length} models`}</div>

        {category && (
          <ProductsList
            products={favorites}
            category={category}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </section>
  );
};
