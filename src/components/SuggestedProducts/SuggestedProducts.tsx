import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const SuggestedProducts = () => {
  const { products } = useProducts();
  const getSuggestedProducts = (prods: Product[]) => {
    const suggested = prods.sort(() => Math.random() - Math.random())
      .slice(0, 10);

    return suggested;
  };

  const suggestedProds = getSuggestedProducts(products);
  const title = 'You may also like';

  return (
    <ProductSlider products={suggestedProds} title={title} />
  );
};
