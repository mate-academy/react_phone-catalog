import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import MainTitle from '../MainTitle';
import Banner from '../Banner';
import Category from '../Category';
import ProductSlider from '../ProductSlider';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import Loader from '../Loader';
import ErrorLoader from '../ErrorLoader';

const Home: React.FC = () => {
  const { productsHotPrices, productsNewModels, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className={styles.home}>
      {loading && !error && <Loader />}
      {error && !loading && <ErrorLoader />}

      {!loading && !error && (
        <>
          <div className="page__wrapper-center">
            <MainTitle>Product Catalog</MainTitle>
          </div>
          <Banner />
          <ProductSlider
            title="Brand new models"
            products={productsNewModels}
          />
          <Category />
          <ProductSlider title="Hot prices" products={productsHotPrices} />
        </>
      )}
    </main>
  );
};

export default Home;
