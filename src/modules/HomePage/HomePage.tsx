import { Container } from '../../components/container/Container';
import { ProductSlider } from './components/ProductsSlider/ProductSlider';
import { ShopCategories } from './components/shopCategory/ShopCategory';
import { SliderHomePage } from './components/sliderHomePage';
import { TitlePages } from './components/title/TitlePages';

export const HomePage = () => {
  return (
    <>
      <TitlePages type={'home'} />
      <SliderHomePage />
      <Container>
        <ProductSlider type={'new'} />
        <ShopCategories />
        <ProductSlider type={'hot'} />
      </Container>
    </>
  );
};
