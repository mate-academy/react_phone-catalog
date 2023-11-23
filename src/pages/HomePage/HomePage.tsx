import { useEffect } from 'react';
import Slider from '../../components/Slider/Slider';
import Loader from '../../components/Loader/Loader';
import { init } from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { getHotPriceProduct } from '../../helpers/getHotPriceProduct';
import { getNewModel } from '../../helpers/getNewModel';
import Categories from '../../components/Categories/Categories';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.products);
  const hotPriceProducts = getHotPriceProduct(list);
  const newModels = getNewModel(list);

  useEffect(() => {
    dispatch(init());
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <Slider />
          <ProductSlider
            title="Hot prices"
            products={hotPriceProducts}
          />
          <Categories
            title="Shop by category"
            products={list}
          />
          <ProductSlider
            title="Brand new models"
            products={newModels}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
