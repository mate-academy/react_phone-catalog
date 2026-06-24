import './ProductSpec.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

type ProductSpecProps = {
  currentProduct: ProductDetails;
};

const ProductSpec = ({ currentProduct }: ProductSpecProps) => {
  return (
    <>
      <div className="product-info__spec">
        <span className="product-info__spec--label">Screen</span>
        <span className="product-info__spec--value">
          {currentProduct.screen}
        </span>
        <span className="product-info__spec--label">Resolution</span>
        <span className="product-info__spec--value">
          {currentProduct.resolution}
        </span>
        <span className="product-info__spec--label">Processor</span>
        <span className="product-info__spec--value">
          {currentProduct.processor}
        </span>
        <span className="product-info__spec--label">Ram</span>
        <span className="product-info__spec--value">{currentProduct.ram}</span>
      </div>
    </>
  );
};

export default ProductSpec;
