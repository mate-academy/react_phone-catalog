import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';

export type ProductMainProps = {
  someProduct: ProductDetails;
};

const ProductMain = ({ someProduct }: ProductMainProps) => {
  return (
    <div className="product-main">
      <ProductGallery someProduct={someProduct} />
    </div>
  );
};

export default ProductMain;
