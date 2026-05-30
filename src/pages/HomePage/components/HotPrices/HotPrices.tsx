import { useContext, useMemo } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import { ProductSlider } from '../../../../components/ProductSlider';
import { getCheapItems } from '../../../../utils/getCheapItems';

export const HotPrices = () => {
  const { products } = useContext(ProductContext);
  const cheapProducts = useMemo(() => {
    return getCheapItems(products);
  }, [products]);

  return (
    <ProductSlider
      products={cheapProducts}
      sectionTitle="Hot prices"
      displayFullPrize={true}
    />
  );
};
