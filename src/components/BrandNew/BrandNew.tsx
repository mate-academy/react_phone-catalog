import { useMemo, useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { getBrandNewProducts } from '../../helpers/getProductsByCategories';

export const BrandNew = () => {
  const { products } = useContext(GlobalContext);

  const getBrandProducts = useMemo(() => {
    return getBrandNewProducts(products);
  }, [products]);

  return (
    <section className="brand-new">
      <ProductsSlider
        items={getBrandProducts}
        sliderTitle="Brand new models"
      />
    </section>
  );
};
