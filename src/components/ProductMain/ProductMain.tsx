import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';

export type ProductMainProps = {
  someProduct: ProductDetails;
};

const ProductMain = ({ someProduct }: ProductMainProps) => {
  return (
    <div className="product-main">
      <ProductGallery someProduct={someProduct} />
      <ProductInfo someProduct={someProduct} />
    </div>
  );
};

export default ProductMain;
