import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/page.scss';
import { ProductsList } from '../components/ProductsList';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../services/getLocalStorage';
import { useEffect } from 'react';
import { setFav } from '../features/favorites';
import { setError, setProducts } from '../features/productSlice';
import { getProducts } from '../services/products';

export const Favorites = () => {
  const [storedFavs, setStoredFavs] = useLocalStorage<number[]>('favs', []);
  const dispatch = useDispatch();
  const favProductIds = useAppSelector(state => state.favorites.products);
  const allProducts = useAppSelector(state => state.products.items);

  useEffect(() => {
    if (!!storedFavs.length) {
      dispatch(setFav(storedFavs));
    }
  }, [dispatch, storedFavs]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        dispatch(setProducts(products));
      } catch (error) {
        dispatch(setError('Failed to fetch products'));
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    setStoredFavs(favProductIds);
  }, [favProductIds, setStoredFavs]);

  // Map favorite product IDs to actual Gadget objects
  const favoriteProducts = allProducts.filter(product =>
    favProductIds.includes(product.id),
  );

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};
