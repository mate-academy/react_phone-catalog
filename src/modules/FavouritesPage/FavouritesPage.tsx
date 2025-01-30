import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCart } from '../../components/ProductCart';
import { init } from '../../features/products';
import style from './FavouritesPage.module.scss';
import { useEffect } from 'react';

export const FavouritesPage = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourites.products);
  const favouritesCount = favourites.length;
  const itemText = favouritesCount === 1 ? 'item' : 'items';

  const products = useAppSelector(state => state.products.items);

  const favouritesProducts = products.filter(product =>
    favourites.includes(product.itemId),
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(init());
    }
  }, [dispatch, products]);

  return (
    <div className={style.favourites}>
      <Breadcrumbs />
      <div className={style.favourites__title}>Favourites</div>
      <div className={style.favourites__countItems}>
        {favouritesCount} {itemText}
      </div>
      <div className={style.favourites__cards}>
        {favouritesProducts.map(product => (
          <ProductCart key={product.itemId} product={product} discount={true} />
        ))}
      </div>
    </div>
  );
};
