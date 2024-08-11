import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';
import style from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const [favourites] = useLocalStorage('favourites', []);

  return (
    <div className={style.favouritesPage}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={style.title}>Favourites</h1>

      <p className={style.countItems}>{favourites.length} items</p>

      {favourites.map((item: Product) => (
        <ProductCard key={item.id} prod={item} />
      ))}
    </div>
  );
};
