import { useContext, useMemo } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import { ProductSlider } from '../../../../components/ProductSlider';
import { getNewItems } from '../../../../utils/getNewItems';

export const NewProducts: React.FC = () => {
  const { products } = useContext(ProductContext);
  const newItems = useMemo(() => {
    return getNewItems(products);
  }, [products]);

  return (
    <ProductSlider
      products={newItems}
      sectionTitle="Brand new models"
      displayFullPrize={false}
    />
  );
};
