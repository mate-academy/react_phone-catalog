import './HomePage.scss';
import { useEffect } from 'react';
import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { init as brandNewProducts } from '../../features/brandNewSlice';
import { init as hotPricesProducts } from '../../features/hotPricesSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { brandNew } = useAppSelector((state: RootState) => state.brandNew);
  const { hotPrices } = useAppSelector((state: RootState) => state.hotPrices);

  useEffect(() => {
    dispatch(brandNewProducts());
    dispatch(hotPricesProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="page">
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
        <ProductsSlider title="Hot prices" products={hotPrices} />
        <Categories />
        <ProductsSlider title="Brand new models" products={brandNew} />
      </div>
    </div>
  );
};
