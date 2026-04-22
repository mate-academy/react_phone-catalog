import './ProductInfo.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';
import ProductColors from './ProductColors/ProductColors';
import ProductCapacity, {
  ProductCapacityType,
} from './ProductCapacity/ProductCapacity';
import ProductPrice from './ProductPrice/ProductPrice';
import ProductSpec from './ProductSpecs/ProductSpec';
import { ProductColor } from '../ProductMain';
import { FavoriteProduct } from '../../../types/FavoriteProduct';
import { Link } from 'react-router-dom';

type ProductInfoProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  currentProduct: ProductDetails;
  selectedCapacity: string;
  setSelectedCapacity: React.Dispatch<
    React.SetStateAction<ProductCapacityType>
  >;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
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
              <div className="product-info__buttons">
                <button
                  className={`product-info__button--add-to-cart ${isBasket ? 'active' : ''}`}
                  onClick={handleToggleBasket}
                >
                  {isBasket ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <Link to="">
                  <img
                    src={
                      isFavorite
                        ? '../../../../public/img/icons/icon--heart--filled.png'
                        : '../../../../public/img/icons/icon--heart.png'
                    }
                    alt="Favorite"
                    className="product-info__button--icon"
                    onClick={handleToggleFavorite}
                  />
                </Link>
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
