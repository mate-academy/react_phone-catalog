import './ProductTopIcons.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import { Link } from 'react-router-dom';

type ProductTopIconsProps = {
  currentProduct: ProductDetails;
};

const ProductTopIcons = ({ currentProduct }: ProductTopIconsProps) => {
  return (
    <>
      <div className="product-main__icons">
        <Link to="/" className="product-main__icon--home"></Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <Link
          to={`/${currentProduct.category}`}
          className="product-main__top--category"
        >
          {currentProduct.category}
        </Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <p className="product-main__top--name">{currentProduct.name}</p>
      </div>
    </>
  );
};

export default ProductTopIcons;
