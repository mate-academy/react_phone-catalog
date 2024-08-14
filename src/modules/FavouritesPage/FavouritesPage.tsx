import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import style from './FavouritesPage.module.scss';
import { FavouritesContext } from '../../store/FavouritesProvider';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className={style.favouritesPage}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs />
      </div>

      {!favourites.length && (
        <>
          <h1 className={style.title}>You haven`t favourite products =(</h1>
        </>
      )}

      {!!favourites.length && (
        <>
          <h1 className={style.title}>Favourites</h1>

          <p className={style.countItems}>{favourites.length} items</p>

          <div className={style.cards}>
            {favourites.map((item: Product) => (
              <div className={style.card} key={item.id}>
                <ProductCard prod={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
