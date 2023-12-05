import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './YouMayAlsoLike.scss';
import { getSuggestedProducts } from '../../helpers/apis';
import { Product } from '../../helpers/types/Product';
import ProductsSlider from '../ProductsSlider/ProductSlider';

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
          title="You may also like"
          sliderId={`youMayAlsoLikeSlider-${uuidv4()}`}
        />
      </div>
    </div>
  );
};
