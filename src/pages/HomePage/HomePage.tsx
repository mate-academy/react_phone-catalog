import { useContext } from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { ProductSlider } from '../../components/ProductSlider';
import './HomePage.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';

export const HomePage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="home-page">
      <BannerSlider />
      <ProductSlider
        title="Hot Prices"
        items={getHotPriceProducts(products)}
      />
    </div>
  );
};
