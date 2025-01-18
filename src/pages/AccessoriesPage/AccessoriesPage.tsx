import './AccessoriesPage.scss';
// eslint-disable-next-line max-len
import { Catalog } from '../../components/Catalog/Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { fetchProducts } from '../../state/productsSlice';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader';

export const AccessoriesPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const accessories = products.filter(
    phone => phone.category === 'accessories',
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

  return (
    <>
      <Catalog products={accessories} type={'Accessories'} />
    </>
  );
};
