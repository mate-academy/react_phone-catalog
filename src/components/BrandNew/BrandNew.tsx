import { useContext } from 'react';
import { ProductContext } from '../../context/productContext';
import { getBrandNewProducts } from '../../utils/api';
import { ProductSlider } from '../ProductsSlider';

export const BrandNew = () => {
  const { products } = useContext(ProductContext);

  const brandNewProducts = getBrandNewProducts(products);

  return <ProductSlider products={brandNewProducts} title="Brand new models" />;
};
