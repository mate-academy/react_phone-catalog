import styles from './HomePage.module.scss';
import { Container } from '../../components/container/Container';
import { ProductSlider } from '../../components/ProductsSlider/ProductSlider';
import { ShopCategories } from './components/shopCategory/ShopCategory';
import { SliderHomePage } from './components/sliderHomePage';
import { TitlePages } from '../../components/title/TitlePages';
import { getNewModels } from '../../components/utils/getNewModels';

import { useAppSelector } from '../../app/hooks';
import { getHotPrices } from '../../components/utils/getHotPrices';

import { Loader } from '../../components/Loader';
export const HomePage = () => {
  const products = useAppSelector(state => state.products.products);
  const isLoaded = useAppSelector(state => state.products.loading);

  if (isLoaded) {
    return <Loader />;
  }

  const newModels = getNewModels(products);
  const hotPrices = getHotPrices(products);

  return (
    <>
      <h1 className={styles.hidden}>Product Catalog</h1>
      <Container>
        <TitlePages type={'home'} />
      </Container>

      <SliderHomePage />
      <Container>
        <ProductSlider sortedProducts={newModels} title={'Brand new models'} />
        <ShopCategories />
        <ProductSlider title={'Hot prices'} sortedProducts={hotPrices} />
      </Container>
    </>
  );
};
