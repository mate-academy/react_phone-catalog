import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Slider } from '../../components/Slider/Slider';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="home-page__postion-modifier container">
        <Slider />
        <ProductsSlider type={ProductsCardType.DISCOUNT} />
        <ShopByCategory />
        <ProductsSlider type={ProductsCardType.NEWBRANDS} />
      </div>
    </>
  );
};
