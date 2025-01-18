import './PhonesPage.scss';
import { Loader } from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../state/productsSlice';
import { AppDispatch, RootState } from '../../state/store';
import Catalog from '../../components/Catalog';

export const PhonesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const phones = products.filter(phone => phone.category === 'phones');

  return (
    <>
      <Catalog products={phones} title="Mobile phones" />
    </>
  );
};
