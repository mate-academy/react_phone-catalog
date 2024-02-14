import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { Slider } from '../../components/Slider/Slider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="home-page__postion-modifier">
        <Slider />
        <ProductsSlider type={ProductsCardType.DISCOUNT} />
        <ShopByCategory />
        <ProductsSlider type={ProductsCardType.NEWBRANDS} />
      </div>
    </>
  );
};
