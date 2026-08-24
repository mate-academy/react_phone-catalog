import product from '../../../public/api/products.json';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices = () => {
  const hotProducts = product
    .filter(
      gadget =>
        gadget.name.includes('iPhone 13') ||
        gadget.name.includes('iPad 10') ||
        gadget.name.includes('iPad Mini (5th Gen)') ||
        gadget.name.includes('Apple Watch Series 5'),
    )
    .sort((a, b) => b.price - a.price);

  return (
    <ProductsSlider title="Hot prices" products={hotProducts} showFullPrice />
  );
};
