import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Slider } from '../../components/Slider/Slider';
import { Welcome } from '../../components/Welcome/Welcome';

export const HomePage = () => (
  <>
    <Welcome />
    <Slider />
    <ProductSlider title={'Brand new models'} />
    <ShopByCategory />
  </>
);
