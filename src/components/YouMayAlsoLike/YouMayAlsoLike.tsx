import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductsSlider/ProductSlider';
import './YouMayAlsoLike.scss';
import { getSuggestedProducts } from '../../helpers/apis';
import { Product } from '../../helpers/types/Product';

interface YouMayAlsoLikeProps {
  productId: string;
}

export const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = (
  { productId },
) => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      getSuggestedProducts('products.json', productId)
        .then((data: any) => setProductData(data));
    }
  }, [productId]);

  return (
    <div className="youlike">
      <div className="youlike-header">
        <ProductsSlider
          productData={productData}
          title="You like"
          keyExtractor={(product: Product) => product.id}
        />
      </div>
    </div>
  );
};
