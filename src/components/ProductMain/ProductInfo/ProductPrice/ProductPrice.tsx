import './ProductPrice.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

type ProductPriceProps = {
  currentProduct: ProductDetails;
};

const ProductPrice = ({ currentProduct }: ProductPriceProps) => {
  return (
    <>
      <div className="product-info__price">
        <span className="product-info__price--regular">
          ${currentProduct.priceRegular}
        </span>
        <span className="product-info_price--discount">
          ${currentProduct.priceDiscount}
        </span>
      </div>
    </>
  );
};

export default ProductPrice;
