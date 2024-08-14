import { Category } from '../components/Category';
import { ProductSlider } from '../components/ProductSlider';
import { Welcome } from '../components/Welcome';
import { useProducts } from '../hooks/useProducts';

export const HomePage = () => {
  const { products } = useProducts();

  const newestModels = [...products].sort((a, b) => b.year - a.year);

  const hotPriceModels = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <>
      <Welcome />
      <ProductSlider title="New Models" items={newestModels} />
      <Category />
      <ProductSlider title="Hot Price" items={hotPriceModels} />
    </>
  );
};
