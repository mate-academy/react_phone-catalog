import { useContext } from 'react';
import { BannerSlider } from '../../components/bannerSlider/BannerSlider';
import { BrandNewModels } from '../../components/brandNewModels/BrandNewModels';
import { HotPrices } from '../../components/hotPrices/HotPrices';
import { ShopByCategory } from '../../components/shopByCategory/ShopByCategory';
import './HomePage.scss';
import { ProductsContext } from '../../context/ProductsContext';

export const HomePage = () => {
  const context = useContext(ProductsContext);
  const { allProducts } = context;

  return (
    <main className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
      <BrandNewModels />
      <ShopByCategory products={allProducts} />
      <HotPrices />
    </main>
  );
};
