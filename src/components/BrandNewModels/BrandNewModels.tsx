import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';

export const BrandNewModels = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const title = 'Brand new models';

  const preparedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    return products.sort((a, b) => b.year - a.year || a.id - b.id).slice(0, 10);
  }, [products]);

  return (
    <div>
      <ProductsSlider
        products={preparedProducts}
        title={title}
        hotPrice={true}
      />
    </div>
  );
};
