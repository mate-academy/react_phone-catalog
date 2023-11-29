import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Banner from '../../components/Banner/Banner';
import { CategoryBlock } from '../../components/CategoryBlock/CategoryBlock';
import { Loader } from '../../components/Loader/Loader';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { fetchProducts } from '../../features/productsSlice';
import { getBrandNewProducts } from '../../helpers/getBrandNewProducts';
import { getHotPriceProducts } from '../../helpers/getHotPrices';
import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <main className="main">
      <Banner />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductSlider
            products={getHotPriceProducts(products)}
            title="Hot prices"
          />

          <CategoryBlock />

          <ProductSlider
            products={getBrandNewProducts(products)}
            title="Brand new models"
          />
        </>
      )}
    </main>
  );
};
