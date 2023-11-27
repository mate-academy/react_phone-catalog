import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';

export const HomePage: React.FC = () => {
  return (
    <>
      <ProductSlider />
      <ProductCard />
    </>
  );
};
