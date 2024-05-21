import './Home.scss';
import { Hero } from '../../components/Hero';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Categories } from '../../components/Categories';
import { useAppContext } from '../../context/context';
import { getHotProducts, getLatestProducts } from '../../utils/utils';
import useSliderSettings from '../../hooks/useSliderSettings';

export const Home = () => {
  const { products } = useAppContext();
  const sliderSettings = useSliderSettings();

  return (
    <>
      <Hero />
      <ProductSlider
        title={'Brand new models'}
        elements={getLatestProducts(products)}
        settings={sliderSettings}
      />
      <Categories />
      <ProductSlider
        title={'Hot prices'}
        isDiscount
        elements={getHotProducts(products)}
        settings={sliderSettings}
      />
    </>
  );
};
