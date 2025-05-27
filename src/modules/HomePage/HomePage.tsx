import { ProductSlider } from './components/ProductsSlider/ProductSlider';
import { SliderHomePage } from './components/slider';
import { TitleHomePage } from './components/title/TitleHomePage';

export const HomePage = () => {
  return (
    <>
      <TitleHomePage />
      <SliderHomePage />
      <ProductSlider type={'new'} />
      <ProductSlider type={'hot'} />
    </>
  );
};
