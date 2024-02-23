import cn from 'classnames';
import { ProductDetails } from '../../store/models/productDetails';
import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
import { OptionsSwitcher } from '../OptionsSwitcher';
import './ProductInfo.scss';

interface Props {
  product: ProductDetails,
  onColorChange: (currentColor: string, newColor: string) => void,
  onCapacityChange: (currentCapacity: string, newCapacity: string) => void,
  onFavoritesToggle: (id: string) => void,
  onCartAdd: (id: string) => void,
  isInCart: (id: string) => boolean,
  isInFavorites: (id: string) => boolean,
}

export const ProductInfo: React.FC<Props> = ({
  product,
  onCapacityChange,
  onFavoritesToggle,
  onCartAdd,
  onColorChange,
  isInCart,
  isInFavorites,

}) => {
  const {
    id,
    colorsAvailable,
    color,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacityAvailable,
    capacity,
  } = product;

  const isCart = isInCart(id);
  const isInFav = isInFavorites(id);

  return (

    <div className="product-info">
      <OptionsSwitcher
        title="Available colors"
        data={colorsAvailable}
        variant="color"
        currentData={color}
        onChoose={onColorChange}
      />
      <div className="product-info__divider" />
      <OptionsSwitcher
        title="Available colors"
        data={capacityAvailable}
        variant="capacity"
        currentData={capacity}
        onChoose={onCapacityChange}
      />
      <div className="product-info__divider" />
      <div className="product-info__value">
        <div className="product-info__value-discount">{`$${priceDiscount}`}</div>
        <h2 className="product-info__value-price">{`$${priceRegular}`}</h2>
      </div>
      <div className="product-info__buttons">
        <button
          type="button"
          className={cn('product-info__buttons-cart', {
            'product-info__buttons-cart--active': isCart,
          })}
          onClick={() => onCartAdd(id)}
        >
          {`${isCart ? 'Added' : 'Add'}  to cart`}
        </button>
        <button
          type="button"
          className="product-info__buttons-fav"
          aria-label="addToFav"
          onClick={() => onFavoritesToggle(id)}
        >
          {isInFav
            ? <Icon icon={Icons.HeartActive} />
            : <Icon icon={Icons.Heart} />}
        </button>
      </div>
      <div className="product-info__characteristics">
        <div className="product-info__characteristics__type">
          <p className="product-info__characteristics__type__text">
            Screen
          </p>
          <p className="product-info__characteristics__type__text">
            Resolution
          </p>
          <p className="product-info__characteristics__type__text">
            Processor
          </p>
          <p className="product-info__characteristics__type__text">
            RAM
          </p>
        </div>
        <div className="product-info__characteristics__value">
          <p className="product-info__characteristics__value__text">
            {screen}
          </p>
          <p className="product-info__characteristics__value__text">
            {resolution}
          </p>
          <p className="product-info__characteristics__value__text">
            {processor}
          </p>
          <p className="product-info__characteristics__value__text">
            {ram}
          </p>
        </div>
      </div>
    </div>
  );
};
