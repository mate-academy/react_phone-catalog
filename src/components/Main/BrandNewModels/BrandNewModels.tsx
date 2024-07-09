import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import { CardsSlider } from '../SliderCards';

export const BrandNewModels = () => {
  const { products } = useContext(ProductsContext);
  const mostExpensive = [...products].sort((a, b) => b.fullPrice - a.fullPrice);
  const title = 'newModels';

  return (
    <CardsSlider products={mostExpensive} title={title} discount={false} />
  );
};
