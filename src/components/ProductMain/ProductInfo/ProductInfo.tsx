import './ProductInfo.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import ProductColors from './ProductColors/ProductColors';
import ProductCapacity from './ProductCapacity/ProductCapacity';
import ProductPrice from './ProductPrice/ProductPrice';
import ProductSpec from './ProductSpecs/ProductSpec';
import ProductAbout from './ProductAbout/ProductAbout';
import ProductTechSpecs from './ProductTechSpecs/ProductTechSpecs';
import { ProductColor } from '../ProductMain';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ProductInfoProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  someProduct: ProductDetails;
};

const ProductInfo = ({
  someProduct,
  selectedColor,
  setSelectedColor,
}: ProductInfoProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState(
    someProduct.capacityAvailable[0],
  );

  return (
    <>
      <div className="product-info__top">
        <div className="product-info__controls">
          <div className="product-info__left">
            <ProductColors
              someProduct={someProduct}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <ProductCapacity
              someProduct={someProduct}
              setSelectedCapacity={setSelectedCapacity}
              selectedCapacity={selectedCapacity}
            />
            <ProductPrice someProduct={someProduct} />
            <div className="product-info__buttons">
              <Link to="" className="product-info__button--add-to-cart">
                Add to cart
              </Link>
              <Link to="" className="product-info__button--icon"></Link>
            </div>
          </div>
          <div className="product-info__right">
            <ProductSpec someProduct={someProduct} />
          </div>
        </div>
      </div>
      <div className="product-info__bottom">
        <ProductTechSpecs someProduct={someProduct} />

        <ProductAbout someProduct={someProduct} />
      </div>
    </>
  );
};

export default ProductInfo;
