import { Container } from '../../components/container/Container';
import { ProductSlider } from '../../components/ProductsSlider/ProductSlider';
import { ShopCategories } from './components/shopCategory/ShopCategory';
import { SliderHomePage } from './components/sliderHomePage';
import { TitlePages } from '../../components/title/TitlePages';
import { getNewModels } from '../../components/utils/getNewModels';

import { useAppSelector } from '../../app/hooks';
import { getHotPrices } from '../../components/utils/getHotPrices';

export const HomePage = () => {
  const products = useAppSelector(state => state.products.products);

  const newModels = getNewModels(products);
  const hotPrices = getHotPrices(products);

  return (
    <>
      <Container>
        <TitlePages type={'home'} />
      </Container>

      <SliderHomePage />
      <Container>
        <ProductSlider sortedProducts={newModels} title={'Brand new models' } />
        <ShopCategories />
        <ProductSlider title={'Hot prices'} sortedProducts={hotPrices} />
      </Container>
    </>
  );
};
