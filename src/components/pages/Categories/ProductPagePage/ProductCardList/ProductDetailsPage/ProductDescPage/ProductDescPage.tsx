import './ProductDescPage.scss';
import { ProductBuyingInfo } from './ProductBuyingInfo/ProductBuyingInfo';
import {
  ProductPicturesBlock,
} from './ProductPicturesBlock/ProductPicturesBlock';
import { ProductTextDesc } from './ProductTextDesc/ProductTextDesc';
import { useContext } from 'react';
import { ProductContext } from '../../../../../../../context/ProductContext';

export const ProductDescPage: React.FC<any> = ({
 products,
}) => {
  const { product, setProduct } = useContext<any>(ProductContext);

  return (
    <div className="product-desc">
      <h1 className="product-desc__title">
        {product.name}
      </h1>
      <div className="product-desc__block">
        <div className="product-desc__info">
          <ProductPicturesBlock
            product={product}
          />
          <ProductBuyingInfo
            product={product}
            products={products}
            setProduct={setProduct}
          />
        </div>
        <div className="product-desc__info">
          <ProductTextDesc product={product} />
          <div className="product-desc__text">
            <div className="product-desc__tech-details">
              <h2 className="product-desc__title">
                Tech specs
              </h2>
              <div className="horizontal-line" />
              <div className="product-desc__tech-details-block">
                <div className="product-desc__keys body14">
                  <p className="product-desc__key">Screen</p>
                  <p className="product-desc__key">Resolution</p>
                  <p className="product-desc__key">Processor</p>
                  <p className="product-desc__key">RAM</p>
                  <p className="product-desc__key">Built in memory</p>
                  <p className="product-desc__key">Camera</p>
                  <p className="product-desc__key">Zoom</p>
                  <p className="product-desc__key">Cell</p>
                </div>
                <div className="product-desc__values body14">
                  <p className="product-desc__value">{product.screen}</p>
                  <p className="product-desc__value">{product.resolution}</p>
                  <p className="product-desc__value">{product.processor}</p>
                  <p className="product-desc__value">{product.ram}</p>
                  <p className="product-desc__value">{product.capacity}</p>
                  <p className="product-desc__value">{product.camera}</p>
                  <p className="product-desc__value">{product.zoom}</p>
                  <p className="product-desc__value">{product.cell}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
