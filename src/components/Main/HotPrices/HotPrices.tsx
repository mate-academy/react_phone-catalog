import { useContext } from 'react';
import { ProductsContext } from '../../../store/ProductsProvider';
import { SectionCards } from '../SectionCards';

export const HotPrices = () => {
  const { products } = useContext(ProductsContext);
  const hotPrices = [...products].sort((a, b) => {
    const bb = ((b.fullPrice - b.price) / b.fullPrice) * 100;
    const aa = ((a.fullPrice - a.price) / a.fullPrice) * 100;

    return bb - aa;
  });

  const title = 'hotPrices';

  return (
    <div>
      <SectionCards products={hotPrices} title={title} />
    </div>
  );
};
