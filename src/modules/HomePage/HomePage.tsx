import BannerSlider from '../../components/BannerSlider';
import ProductsSlider from '../../components/ProductsSlider';
import ShopCategories from '../../components/ShopCategories';
import Title from '../../components/Title';
import style from './HomePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/features/productsSlice';
import Loader from '../../components/Loader';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return (
    <div className={style.home}>
      <Title text="Welcome to Nice Gadgets store!" />
      <BannerSlider />
      {loading ? (
        <Loader />
      ) : (
        <ProductsSlider title="Brand new models" products={products} />
      )}

      <ShopCategories />
      {loading ? (
        <Loader />
      ) : (
        <ProductsSlider title="Hot prices" products={products} />
      )}
    </div>
  );
};

export default HomePage;
