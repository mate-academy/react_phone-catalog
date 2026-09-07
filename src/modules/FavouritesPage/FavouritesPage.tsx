import style from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs';
import { ProductList } from '../../components/ProductsList';
import { useFavourites } from '../../store/FavouritesContext';

export const FavouritesPage = () => {
  const {
    state: { favourite },
  } = useFavourites();

  return (
    <div>
      <Breadcrumbs />
      <h1 className={style.pageTitile}>Favourites</h1>
      <p className={style.itemsCount}>{favourite.length} items</p>
      {favourite.length ? <ProductList products={favourite} /> : ''}
    </div>
  );
};
