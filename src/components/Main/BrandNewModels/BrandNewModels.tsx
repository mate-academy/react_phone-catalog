import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import { SectionCards } from '../SectionCards';

export const BrandNewModels = () => {
  const { products } = useContext(ProductsContext);
  const mostExpensive = [...products].sort((a, b) => b.fullPrice - a.fullPrice);
  const title = 'newModels';
  return (
    <div>
      <SectionCards products={mostExpensive} title={title} />
    </div>
  );
};
