import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
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
          sliderId={`brandNewModelsSlider-${uuidv4()}`}
          productData={productData}
          title="Brand new Models"
        />
      </div>
    </div>
  );
};
