import './ProductPrice.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

type ProductPriceProps = {
  someProduct: ProductDetails;
};

const ProductPrice = ({ someProduct }: ProductPriceProps) => {
  return (
    <>
      <div className="product-info__price">
        <span className="product-info__price--regular">
          ${someProduct.priceRegular}
        </span>
        <span className="product-info_price--discount">
          ${someProduct.priceDiscount}
        </span>
      </div>
    </>
  );
};

export default ProductPrice;
