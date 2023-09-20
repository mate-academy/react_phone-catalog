/* eslint-disable jsx-a11y/control-has-associated-label */
import '../../styles/components/ProductCard/ProductCard.scss';

import classNames from 'classnames';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  isSelected: boolean,
  isFavourite: boolean,
  onSelectedClick: () => void;
  onFavouritesClick: () => void;
};

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({
  product,
  isSelected,
  isFavourite,
  onSelectedClick,
  onFavouritesClick,
}) => {
  const {
    name, image, price, fullPrice, screen, capacity, ram,
  } = product;

  return (
    <article className="card">
      <img
        src={`${BASE_URL}${image}`}
        alt="phone img"
        className="card__image"
      />

      <p className="card__title">{name}</p>

      <div className="card__price-container">
        <p className="card__actual-price">{`$${price}`}</p>

        <p
          className="card__initial-price"
          hidden={!fullPrice}
        >
          {`$${fullPrice}`}
        </p>
      </div>

      <div className="card__info-container">
        <div className="card__info-titles">
          <p className="card__info-title">Screen</p>
          <p className="card__info-title">Capacity</p>
          <p className="card__info-title">Ram</p>
        </div>
        <div className="card__info-values">
          <p className="card__info-value">{!screen ? '-' : (screen)}</p>
          <p className="card__info-value">{!capacity ? '-' : (capacity)}</p>
          <p className="card__info-value">{!ram ? '-' : (ram)}</p>
        </div>
      </div>

      <div className="card__buttons-container">
        <button
          type="button"
          className={classNames('card__add-button', {
            'is-active': isSelected,
          })}
          onClick={onSelectedClick}
        >
          Add to card
        </button>

        <button
          type="button"
          className={classNames('card__fav-button', {
            'is-active': isFavourite,
          })}
          onClick={onFavouritesClick}
        />
      </div>
    </article>
  );
};
