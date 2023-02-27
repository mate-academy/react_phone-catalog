import './ProductDescPage.scss';
import { useContext } from 'react';
import { ProductBuyingInfo } from './ProductBuyingInfo/ProductBuyingInfo';
import {
  ProductPicturesBlock,
} from './ProductPicturesBlock/ProductPicturesBlock';
import { ProductTextDesc } from './ProductTextDesc/ProductTextDesc';
import {
  DetailedProductContext,
} from '../../../../../../../context/DetailedProductContext';
import { Product } from '../../../../../../../types/types';

type Props = {
  products: Product[],
  singleProduct: Product[] | undefined,
};

export const ProductDescPage: React.FC<Props> = ({
  products,
  singleProduct,
}) => {
  const {
    detailedProduct,
  } = useContext(DetailedProductContext);

  return (
    <div className="product-desc">
      <h1 className="product-desc__title">
        {detailedProduct.name}
      </h1>
      <div className="product-desc__block">
        <div className="product-desc__info">
          <ProductPicturesBlock />
          <ProductBuyingInfo
            products={products}
            singleProduct={singleProduct}
          />
        </div>
        <div className="product-desc__info">
          <ProductTextDesc />
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
                  <p className="product-desc__value">
                    {detailedProduct.screen}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.resolution}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.processor}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.ram}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.capacity}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.camera}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.zoom}
                  </p>
                  <p className="product-desc__value">
                    {detailedProduct.cell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
