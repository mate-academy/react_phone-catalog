import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1>Home Page</h1>
      <ProductsSlider />
      <ProductCard />
    </>
  );
};
