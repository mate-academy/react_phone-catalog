import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';
import { useContext, useEffect } from 'react';
import { ProductContext } from './shared/store/GlobalProvider';
import { getAllProducts } from './shared/services/apiServices';

export const App = () => {
  const { setLoading, setError, setData } = useContext(ProductContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    setError('');

    const loadProduct = async () => {
      try {
        const response = await getAllProducts('/products.json');

        setData(response.data);
      } catch {
        setError('Something get wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
