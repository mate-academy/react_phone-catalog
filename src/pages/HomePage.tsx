import { Banner } from '../components/Banner/Banner';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';

export const HomePage = () => {
  return (
    <main className="main">
      <Banner />

      <ProductsSlider />
    </main>
  );
};
