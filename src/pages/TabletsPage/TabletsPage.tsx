import './TabletsPage.scss';
// eslint-disable-next-line max-len
import { Catalog } from '../../components/Catalog/Catalog';
import { useEffect } from 'react';
import { fetchProducts } from '../../state/productsSlice';
import { Loader } from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const TabletsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const tablets = products.filter(phone => phone.category === 'tablets');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Catalog products={tablets} type={'Tablets'} />
    </>
  );
};
