import { Link } from 'react-router-dom';
import { useFavourites } from '../shared/context/FavouritesContext';
import { useProducts } from '../shared/context/ProductsContext';
import { ProductsList } from '../shared/ProductsList';
import style from './FavouriteProductsList.module.scss';

export const FavouriteProductsList = () => {
  const { favourites } = useFavourites();
  const { products } = useProducts();
  const favouriteProducts = products.filter(product =>
    favourites.includes(product.id),
  );

  return (
    <div className={style.favorites}>
      <div className={style.favorites__header}>
        <Link to="/">
          <img src="icons/home.png" alt="Back home" />
        </Link>
        <img src="icons/arrow-right.png" alt="Favorites" />
        <span className={style.favorites__name}>Favourites</span>
      </div>
      <h1 className={style.title}>Favourites</h1>
      <p className={style.favorites__quantity}>
        {`${favourites.length}`} items
      </p>
      <ProductsList products={favouriteProducts} />
    </div>
  );
};
