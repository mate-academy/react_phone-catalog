import { useMemo} from 'react';
import { useAppSelector } from './hooks';
import { useLocation } from 'react-router-dom';

const useFilterProducts = () => {
  const { pathname, search } = useLocation();

const { products, phones, tablets, accessories} = useAppSelector(state => state.product);
  const filterProduct = useMemo(() => {
    switch(pathname) {
      case '/phones' :
        return phones;

      case '/tablets' :
        return tablets;

      case '/accessories' :
      return accessories;

      default:
        return products;
    }
  }, [pathname, products, search]);

  return { filterProduct };
};

export default useFilterProducts;
