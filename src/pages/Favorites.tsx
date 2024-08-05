import { Link } from 'react-router-dom';
// import { Footer } from '../components/Footer';
// import { Header } from '../components/Header';
import '../styles/page.scss';
import { ProductsList } from '../components/ProductsList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocalStorage } from '../services/getLocalStorage';
import { useEffect } from 'react';
import { setFav } from '../features/favorites';
import { init } from '../features/productSlice';

export const Favorites = () => {
  const [storedFavs, setStoredFavs] = useLocalStorage<string[]>('favs', []);
  const dispatch = useAppDispatch();
  const favProductIds = useAppSelector(state => state.favorites.products);
  const allProducts = useAppSelector(state => state.products.items);

  useEffect(() => {
    if (!!storedFavs.length) {
      dispatch(setFav(storedFavs));
    }
  }, [dispatch, storedFavs]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    setStoredFavs(favProductIds);
  }, [favProductIds, setStoredFavs]);

  const favoriteProducts = allProducts.filter(product =>
    favProductIds.includes(product.itemId),
  );

  return (
    <div className="container">
      <div className="selected-cat">
        <div className="selected-cat__active">
          <Link to="/" className="selected-cat__active--link">
            <svg className="icon icon-home">
              <use href="img/icons.svg#icon-home"></use>
            </svg>
          </Link>
          <div className="selected-cat__active--arrow">
            <svg className="icon icon-arrow-right">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </div>
          <Link to="/favorites" className="selected-cat__active--name">
            Favourites
          </Link>
        </div>
        <h1 className="selected-cat__title">Favourites</h1>
        <p className="selected-cat__text">
          {favoriteProducts.length > 1
            ? `${favoriteProducts.length} items`
            : `${favoriteProducts.length} item`}
        </p>
        <div className="favorites__box">
          <ProductsList products={favoriteProducts} />
        </div>
      </div>
    </div>
  );
};
