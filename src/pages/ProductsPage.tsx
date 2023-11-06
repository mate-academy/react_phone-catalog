import { useLocation } from 'react-router-dom';

export const ProductsPage = () => {
  const { pathname } = useLocation();

  return <h1>{`${pathname} page`}</h1>;
};
