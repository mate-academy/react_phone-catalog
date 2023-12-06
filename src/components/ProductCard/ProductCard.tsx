/* eslint-disable  jsx-a11y/control-has-associated-label */
import { getCorrectImageUrl } from '../../helpers/getCorrectImageUrl';
import { getMemoryString } from '../../helpers/getMemoryString';
import { Item } from '../../types/Item';
import './ProductCard.scss';

type Props = {
  item: Item;
};

const CURRENCY = '$';

export const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="product-card">
      <div className="product-card__top">
        <img
          src={getCorrectImageUrl(item.imageUrl)}
          className="product-card__top-image"
          alt="Product"
        />
        <h2
          className="product-card__top-title"
        >
          {item.name}
        </h2>
        <div className="product-card__top-price">
          {
            item.discount !== 0
              ? (
                <>
                  <p className="product-card__top-price--new">
                    {CURRENCY
                      + (item.price - ((item.price * item.discount) / 100))}
                  </p>
                  <p className="product-card__top-price--old">
                    {CURRENCY + item.price}
                  </p>
                </>
              ) : (
                <p className="product-card__top-price--new">
                  {CURRENCY + item.price}
                </p>
              )
          }
        </div>
      </div>
      <div className="product-card__bottom">
        <div className="product-card__bottom-info">
          <div className="product-card__bottom-info-block">
            <p className="product-card__bottom-info-block-title">
              Screen
            </p>
            <p className="product-card__bottom-info--block-value">
              {item.screen}
            </p>
          </div>
          {item.capacity && (
            <div className="product-card__bottom-info-block">
              <p className="product-card__bottom-info-block-title">
                Capacity
              </p>
              <p className="product-card__bottom-info--block-value">
                {getMemoryString(item.capacity)}
              </p>
            </div>
          )}
          {item.ram && (
            <div className="product-card__bottom-info-block">
              <p className="product-card__bottom-info-block-title">
                RAM
              </p>
              <p className="product-card__bottom-info--block-value">
                {getMemoryString(item.ram)}
              </p>
            </div>
          )}
        </div>
        <div className="product-card__bottom-controls">
          <button
            className="primary-button"
            type="button"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="simple-button favourite"
          />
        </div>
      </div>
    </div>
  );
};
