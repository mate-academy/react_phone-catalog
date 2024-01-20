import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Slider } from '../../components/Slider/Slider';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="home-page__postion-modifier">
        <Slider />
        <ProductsSlider type={ProductsCardType.DISCOUNT} />
      </div>
    </>
  );
};
