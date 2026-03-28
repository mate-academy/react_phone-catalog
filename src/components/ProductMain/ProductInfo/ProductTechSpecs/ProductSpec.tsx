import './ProductSpec.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

type ProductSpecProps = {
  someProduct: ProductDetails;
};

const ProductSpec = ({ someProduct }: ProductSpecProps) => {
  return (
    <>
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

export default ProductSpec;
