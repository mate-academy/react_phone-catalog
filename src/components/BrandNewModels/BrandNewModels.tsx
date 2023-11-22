import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductsSlider/ProductSlider';
import './BrandNewModels.scss';
import { Product } from '../../helpers/types/Product';
import { getBrandNewProducts } from '../../helpers/apis';

export const BrandNewModels = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    getBrandNewProducts('products.json')
      .then((data: any) => setProductData(data));
  }, []);

  return (
    <div className="newmodels">
      <div className="newmodels-header">
        <ProductsSlider
          productData={productData}
          title="Brand new Models"
          keyExtractor={(product) => product.id}
        />
      </div>
    </div>
  );
};
