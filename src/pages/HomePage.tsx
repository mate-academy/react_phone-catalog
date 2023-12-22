import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useMemo } from 'react';
import { Slider } from '../components/Slider';
import { Phone } from '../types/Phone';
import { ProductSlider } from '../components/ProductSlider';
import { ShopByCategory } from '../components/ShopByCategory';

type Props = {
  products: Phone[],
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const getHotPriceProducts = useMemo(() => {
    return products
      .filter((product) => product.price)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return (
    <div className="section">
      <Slider />

      <ProductSlider
        title="Hot Prices"
        products={getHotPriceProducts}
      />

      <ShopByCategory products={products} />

      <ProductSlider
        title="Brand new models"
        products={getBrandNewProducts}
      />
    </div>
  );
};
