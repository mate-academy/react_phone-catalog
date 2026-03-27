import './ProductInfo.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import ProductColors from './ProductColors/ProductColors';
import ProductCapacity from './ProductCapacity/ProductCapacity';
import ProductPrice from './ProductPrice/ProductPrice';

type ProductInfoProps = {
  someProduct: ProductDetails;
};

const ProductInfo = ({ someProduct }: ProductInfoProps) => {
  return (
    <>
      <h1 className="product-info__title"></h1>
      <ProductColors someProduct={someProduct} />
      <ProductCapacity someProduct={someProduct} />
      <ProductPrice someProduct={someProduct} />
      <div className="product-info__spec">
        <span className="product-info__spec--label">Screen</span>
        <span className="product-info__spec--value">{someProduct.screen}</span>
        <span className="product-info__spec--label">Resolution</span>
        <span className="product-info__spec--value">
          {someProduct.resolution}
        </span>
        <span className="product-info__spec--label">Processor</span>
        <span className="product-info__spec--value">
          {someProduct.processor}
        </span>
        <span className="product-info__spec--label">Ram</span>
        <span className="product-info__spec--value">{someProduct.ram}</span>
      </div>
    </>
  );
};

export default ProductInfo;
