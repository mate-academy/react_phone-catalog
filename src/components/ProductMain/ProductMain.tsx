import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductAbout from './ProductAbout/ProductAbout';
import { useState } from 'react';
import ProductTechSpecs from './ProductTechSpecs/ProductTechSpecs';
import { Link } from 'react-router-dom';

export type ProductMainProps = {
  someProduct: ProductDetails;
};

export type ProductColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'white'
  | 'purple'
  | 'red'
  | 'spacegray'
  | 'silver'
  | 'gold'
  | 'spaceblack'
  | 'sierrablue'
  | 'graphite'
  | 'midnight'
  | 'coral'
  | 'starlight'
  | 'skyblue';

const ProductMain = ({ someProduct }: ProductMainProps) => {
  const [selectedColor, setSelectedColor] = useState(
    someProduct.colorsAvailable[0] as ProductColor,
  );

  return (
    <div className="product-main">
      <div className="product-main__icons">
        <Link to="/" className="product-main__icon--home"></Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <Link
          to={`/${someProduct.category}`}
          className="product-main__top--category"
        >
          {someProduct.category.charAt(0).toUpperCase() +
            someProduct.category.slice(1)}
        </Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <p className="product-main__top--name">{someProduct.name}</p>
      </div>
      <Link to="/" className="product-main__buttons--back">
        <Link to="/" className="product-main__icon--back"></Link>
        <p className="product-main__text--back">Back</p>
      </Link>
      <h1 className="product-main__title">{someProduct.name}</h1>
      <ProductGallery someProduct={someProduct} />
      <ProductInfo
        someProduct={someProduct}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ProductAbout someProduct={someProduct} />
      <ProductTechSpecs someProduct={someProduct} />
    </div>
  );
};

export default ProductMain;
