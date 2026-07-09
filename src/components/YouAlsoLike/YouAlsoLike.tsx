import { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../hooks/getSuggestedProducts';
import ProductSlider from '../ProductSlider/ProductSlider';
import { Products } from '../../types/Products';

type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
  productId: string;
};

export const YouAlsoLike: React.FC<Props> = ({ category, productId }) => {
  const showDiscount = true;
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getSuggestedProducts(category, productId).then(setProducts);
  }, [category, productId]);

  return (
    <ProductSlider
      title="You may also like"
      products={products}
      showDiscount={showDiscount}
    />
  );
};
