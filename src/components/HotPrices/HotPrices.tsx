import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductsSlider/ProductSlider';
import './HotPrices.scss';
import { getHotPriceProducts } from '../../helpers/apis';
import { Product } from '../../helpers/types/Product';

export const HotPrices = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts('products.json')
      .then((data: any) => setProductData(data));
  }, []);

  return (
    <div className="hotprices">
      <div className="hotprices-header">
        <ProductsSlider
          productData={productData}
          title="Hot prices"
          keyExtractor={(product: Product) => product.id}
        />
      </div>
    </div>
  );
};
