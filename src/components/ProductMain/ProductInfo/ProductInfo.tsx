import './ProductInfo.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import ProductColors from './ProductColors/ProductColors';
import ProductCapacity, {
  ProductCapacityType,
} from './ProductCapacity/ProductCapacity';
import ProductPrice from './ProductPrice/ProductPrice';
import ProductSpec from './ProductSpecs/ProductSpec';
import { ProductColor } from '../../../types/ProductColor';
import ProductButtons from './ProductButtons/ProductButtons';

type ProductInfoProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  currentProduct: ProductDetails;
  selectedCapacity: string;
  setSelectedCapacity: React.Dispatch<
    React.SetStateAction<ProductCapacityType>
  >;
  isFavorite: boolean;
  handleToggleFavorite: React.MouseEventHandler<HTMLImageElement>;
  isBasket: boolean;
  handleToggleBasket: React.MouseEventHandler<HTMLButtonElement>;
};

const ProductInfo = ({
  currentProduct,
  selectedColor,
  setSelectedColor,
  selectedCapacity,
  setSelectedCapacity,
  isFavorite,
  handleToggleFavorite,
  handleToggleBasket,
  isBasket,
}: ProductInfoProps) => {
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
              <ProductButtons
                handleToggleFavorite={handleToggleFavorite}
                handleToggleBasket={handleToggleBasket}
                isFavorite={isFavorite}
                isBasket={isBasket}
              />
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
