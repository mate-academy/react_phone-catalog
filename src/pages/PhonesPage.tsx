import { useEffect } from 'react';
import { ProductsList } from '../components/ProductsList/ProductsList';

export const PhonesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProductsList />
    </>
  );
};
