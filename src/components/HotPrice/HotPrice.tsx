import { useMemo, useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { getHotPriceProducts } from '../../helpers/getProductsByCategories';

export const HotPrice = () => {
  const { products } = useContext(GlobalContext);

  const getHotProducts = useMemo(() => {
    return getHotPriceProducts(products);
  }, [products]);

  return (
    <section className="hot-price">
      <ProductsSlider
        items={getHotProducts}
        sliderTitle="Hot prices"
      />
    </section>
  );
};
