import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getTabletsList } from '../../helpers/getCategoriesList';
import { init } from '../../features/products/productsSlice';
import Loader from '../../components/Loader/Loader';
import ProductsList from '../../components/ProductsList/ProductsList';

const TabletsPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.products);
  const tabletsList = getTabletsList(list);

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
          products={tabletsList}
          title="Tablets"
        />
      )}
    </>
  );
};

export default TabletsPage;
