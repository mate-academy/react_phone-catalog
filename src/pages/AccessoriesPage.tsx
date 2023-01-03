import {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../helpers/api';
import { NoResults } from '../components/additional/NoResults';
import { WidthContext } from '../components/context/WidthContext';
import { Searchbar } from '../components/Header/Searcbar';
import { ProductList } from '../components/Products/ProductList';
import { Product } from '../types/Product';
import { Loader } from '../components/additional/Loader';
import { Errors } from '../types/Errors';
import { Breadcrumbs } from '../components/additional/Breadcrumbs';

export const AccessoriesPage = () => {
  const width = useContext(WidthContext);
  const location = useLocation();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [foundModels, setFoundModels] = useState(0);

  const getAccessories = useCallback(async () => {
    setIsLoad(true);
    try {
      const allProducts : Product[] = await getProducts();

      setAccessories(allProducts.filter(prod => prod.type === 'accessory'));
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  }, []);

  useEffect(() => {
    getAccessories();
  }, []);

  return (
    <main className="main">

      <Breadcrumbs />

      <div className="page-heading">
        <h1>Accessories</h1>
        <p
          className="page-heading__count"
        >
          {foundModels > 0
            ? `Found ${foundModels} models`
            : `${accessories.length} models`}
        </p>
      </div>

      <Searchbar isHidden={width > 1120} />

      {isLoad && (<Loader />)}

      {!isLoad && accessories.length > 0 && (
        <ProductList products={accessories} serchResult={setFoundModels} />)}

      {!isLoad && !isError && accessories.length === 0 && (
        <NoResults text={`${location.pathname.slice(1)} not found`} />)}

      {isError && (<NoResults text={Errors.FETCH} isShowButton={false} />)}

    </main>
  );
};
