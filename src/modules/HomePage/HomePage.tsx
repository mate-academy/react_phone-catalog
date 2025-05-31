import { Container } from '../../components/container/Container';
import { ProductSlider } from './components/ProductsSlider/ProductSlider';
import { ShopCategories } from './components/shopCategory/ShopCategory';
import { SliderHomePage } from './components/slider';
import { TitleHomePage } from './components/title/TitleHomePage';

export const HomePage = () => {
  return (
    <>
      <TitleHomePage />
      <SliderHomePage />
      <Container>
        <ProductSlider type={'new'} />
         <ShopCategories/>


     
        <ProductSlider type={'hot'} />
       </Container>


    </>
  );
};
