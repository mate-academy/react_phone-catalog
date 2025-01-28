import { useEffect } from 'react';
import { BanerSlider } from './components/BanerSlider/BanerSlider';
import { Loader } from '../../components/Loader';
import { BrandNewModels } from '../../components/ProductsSlider/BrandNewModels';
import { fetchProducts } from '../../state/productsSlice';
import './HomePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { Categories } from './components/Categories/Categories';
import { HotPrices } from '../../components/ProductsSlider/HotPrices';

export const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const phones = products.filter(product => product.category === 'phones');

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
      <div className="contatiner">
        <h1 className="title">Welcome to Nice Gadgets store!</h1>
        <BanerSlider />
        <BrandNewModels phones={phones} />
        <Categories />
        <HotPrices phones={phones} />
      </div>
    </>
  );
};
