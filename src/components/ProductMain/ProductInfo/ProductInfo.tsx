import './ProductInfo.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import ProductColors from './ProductColors/ProductColors';
import ProductCapacity, {
  ProductCapacityType,
} from './ProductCapacity/ProductCapacity';
import ProductPrice from './ProductPrice/ProductPrice';
import ProductSpec from './ProductSpecs/ProductSpec';
import { ProductColor } from '../ProductMain';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ProductInfoProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  currentProduct: ProductDetails;
  selectedCapacity: string;
  setSelectedCapacity: React.Dispatch<
    React.SetStateAction<ProductCapacityType>
  >;
};

const ProductInfo = ({
  currentProduct,
  selectedColor,
  setSelectedColor,
}: ProductInfoProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState(
    currentProduct.capacityAvailable[0],
  );

  return (
    <>
      {' '}
      <div className="product-info">
        <div className="product-info__top">
          <div className="product-info__controls">
            <div className="product-info__left">
              <ProductColors
                currentProduct={currentProduct}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <ProductCapacity
                currentProduct={currentProduct}
                setSelectedCapacity={setSelectedCapacity}
                selectedCapacity={selectedCapacity}
              />
              <ProductPrice currentProduct={currentProduct} />
              <div className="product-info__buttons">
                <Link to="" className="product-info__button--add-to-cart">
                  Add to cart
                </Link>
                <Link to="" className="product-info__button--icon"></Link>
              </div>
            </div>
            <div className="product-info__right">
              <ProductSpec currentProduct={currentProduct} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
