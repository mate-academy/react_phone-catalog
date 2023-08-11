import { Photos } from '../../components/Photos';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Catagories';
import { NewBrands } from '../../components/NewBrands';

export const HomePage = () => {
  return (
    <main className="home page__main-container">
      <Photos />

      <ProductsSlider />

      <Categories />

      <NewBrands />
    </main>
  );
};
