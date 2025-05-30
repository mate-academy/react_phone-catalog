import { Container } from '../../components/container/Container';
import { ProductSlider } from './components/ProductsSlider/ProductSlider';
import { SliderHomePage } from './components/slider';
import { TitleHomePage } from './components/title/TitleHomePage';

export const HomePage = () => {
  return (
    <>
      <TitleHomePage />
      <SliderHomePage />
      <Container>
      <ProductSlider type={'new'} />
        <ProductSlider type={'hot'} />
        </Container>
    </>
  );
};
