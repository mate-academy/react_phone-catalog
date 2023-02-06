import './ProductBuyingInfo.scss';
// import { ProductCapacity } from './ProductCapacity/ProductCapacity';
import {
  ProductAvaliableColors,
} from './ProductAvaliableColors/ProductAvaliableColors';
import {
  LongButton,
} from '../../../../../../../../helpers/LongButton/LongButton';
import { Button } from '../../../../../../../../helpers/Button/Button';

export const ProductBuyingInfo = ({ product, products, setProduct }:any) => {
  return (
    <div className="buying-info">
      <div className="buying-info__details">
        <ProductAvaliableColors
          product={product}
          products={products}
          setProduct={setProduct}
        />
        {/* <ProductCapacity
          product={product}
          products={products}
          setProduct={setProduct}
        /> */}
        <div className="buying-info__price">
          <h1 className="product__price">
            $
            {product.priceDiscount}
          </h1>
          <h2 className="product__old-price">
            $
            {product.priceRegular}
          </h2>
        </div>
        <div className="buying-info__buttons">
          <LongButton text="Add to cart" />
          <Button image="/icons/Favourites.svg" title="favourites" />
        </div>
        <div className="buying-info__tech-details body12">
          <div className="buying-info__keys">
            <p className="buying-info__key">Screen</p>
            <p className="buying-info__key">Resolution</p>
            <p className="buying-info__key">Processor</p>
            <p className="buying-info__key">RAM</p>
          </div>
          <div className="buying-info__values">
            <p className="buying-info__value">{product.screen}</p>
            <p className="buying-info__value">{product.resolution}</p>
            <p className="buying-info__value">{product.processor}</p>
            <p className="buying-info__value">{product.ram}</p>
          </div>
        </div>
      </div>
      <p className="product-id body12">
        {product.id}
      </p>
    </div>
  );
};
