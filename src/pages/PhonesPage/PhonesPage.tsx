import { useEffect } from 'react';
import { getPhonesList } from '../../helpers/getCategoriesList';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import Loader from '../../components/Loader/Loader';
import ProductsList from '../../components/ProductsList/ProductsList';
import { init } from '../../features/products/productsSlice';

const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.products);
  const phoneList = getPhonesList(list);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      {loading ? (<Loader />) : (
        <ProductsList
          products={phoneList}
          title="Mobile phones"
        />
      )}
    </>
  );
};

export default PhonesPage;
