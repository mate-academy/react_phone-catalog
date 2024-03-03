import { memo } from 'react';
import cn from 'classnames';
import { Icons } from '../../types/Icons';
import { Icon } from '../Icon';
import { OptionsSwitcher } from '../OptionsSwitcher';
import './ProductInfo.scss';
import { ProductInfoProps } from './types';

export const ProductInfo = memo<ProductInfoProps>(({
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
            'product-info__buttons-cart--active': isInCart(id),
          })}
          onClick={() => onCartAdd(id)}
        >
          {`${isInCart(id) ? 'Added' : 'Add'}  to cart`}
        </button>
        <button
          type="button"
          className="product-info__buttons-fav"
          aria-label="addToFav"
          onClick={() => onFavoritesToggle(id)}
        >
          {isInFavorites(id)
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
});
