import { useMemo } from 'react';
import { useAppSelector } from './hooks';
import { useLocation } from 'react-router-dom';

const useFilterProducts = () => {
  const { pathname } = useLocation();

  const { products, phones, tablets, accessories } = useAppSelector(
    state => state.product,
  );
  const filterProduct = useMemo(() => {
    switch (pathname) {
      case '/phones':
        return phones;

      case '/tablets':
        return tablets;

      case '/accessories':
        return accessories;

      default:
        return products;
    }
  }, [pathname, products, phones, tablets, accessories]);

  return { filterProduct };
};

export default useFilterProducts;
