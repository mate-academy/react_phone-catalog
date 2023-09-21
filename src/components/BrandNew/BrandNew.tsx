import { useProducts } from '../../context/ProductContext';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const BrandNew = () => {
  const { products } = useProducts();

  const title = 'Brand new models';
  const brandNewProducts = getBrandNewProducts(products);

  return (
    <div className="container">
      <ProductSlider products={brandNewProducts} title={title} />
    </div>
  );
};
