import { useContext } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { Categories } from '../../components/Categories/Categories';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import './HomePage.scss';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);

  const hotPriceProducts = getHotPriceProducts(products);
  const brandNewProducts = [...products].sort((a, b) => a.year - b.year)
    .reverse();

  return (
    <div className="home-page">
      <BannerSlider />

      <ProductSlider title="Hot products" products={hotPriceProducts} />

      <Categories />

      <ProductSlider title="Brand new" products={brandNewProducts} />
    </div>
  );
};
