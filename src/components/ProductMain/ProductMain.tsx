import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import { useState } from 'react';

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
      <h1 className="product-main__title">{someProduct.name}</h1>
      <ProductGallery someProduct={someProduct} />
      <ProductInfo
        someProduct={someProduct}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default ProductMain;
