import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <PicturesSlider />
      <ProductsSlider title="Hot prices" />
      <ShopByCategory />
      <ProductsSlider title="Brand new" />
    </>
  );
};
