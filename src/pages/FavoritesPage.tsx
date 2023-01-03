import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { NoResults } from '../components/additional/NoResults';
import { WidthContext } from '../components/context/WidthContext';
import { Searchbar } from '../components/Header/Searcbar';
import { ProductList } from '../components/Products/ProductList';
import { Product } from '../types/Product';
import { Loader } from '../components/additional/Loader';
import { FavoritesProducts } from '../components/context/SavedProductsContext';
import { Breadcrumbs } from '../components/additional/Breadcrumbs';

export const FavoritesPage = () => {
  const width = useContext(WidthContext);
  const { favoritesProducts } = useContext(FavoritesProducts);
  const location = useLocation();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [foundModels, setFoundModels] = useState(0);

  useEffect(() => {
    setFavorites(favoritesProducts);
    setIsLoad(false);
  }, [favoritesProducts]);

  return (
    <main className="main">

      <Breadcrumbs />

      <div className="page-heading">
        <h1>Favorites</h1>
        <p
          className="page-heading__count"
        >
          {foundModels > 0
            ? `Found ${foundModels} models`
            : `${favorites.length} models`}
        </p>
      </div>

      <Searchbar isHidden={width > 1120} />

      {isLoad && (<Loader />)}

      {!isLoad && favorites.length > 0 && (
        <ProductList products={favorites} serchResult={setFoundModels} />)}

      {!isLoad && favorites.length === 0 && (
        <NoResults text={`${location.pathname.slice(1)} not found`} />)}

    </main>
  );
};
