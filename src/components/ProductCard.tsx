import classNames from 'classnames';
import { useMyContext } from '../context/context';
import { Product } from '../helpers/Product';

export type ProductCardProps = {
  product: Product;
  ProductSlider?: React.CSSProperties;
};

export const ProductCard = ({
  product, ProductSlider,
}: ProductCardProps) => {
  const {
    id, name, itemId, image, price, fullPrice, screen, capacity, ram,
  } = product;

  const {
    toggleToCart, toggleToFavourites, isInFavourites, isInCart,
  } = useMyContext();

  return (
    <li
      key={id}
      className="product-card"
      style={ProductSlider}
      data-cy="cardsContainer"
    >
      <img className="product-card__image" alt={itemId} src={`_new/${image}`} />
      <h2 className="product-card__name">{name}</h2>
      <span className="product-card__price">
        {`$${price}`}
        <span className="product-card__price-fullPrice">
          {`$${fullPrice}`}
        </span>
      </span>
      <div className="product-card__line" />

      <div className="product-card__details">
        <span className="product-card__details-label">Screen</span>
        <span className="product-card__details-value">{screen}</span>
      </div>
      <div className="product-card__details">
        <span className="product-card__details-label">Capacity</span>
        <span className="product-card__details-value">{capacity}</span>
      </div>
      <div className="product-card__details">
        <span className="product-card__details-label">RAM</span>
        <span className="product-card__details-value">{ram}</span>
      </div>
      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('product-card__buttons-cart',
            'buttons__cart',
            {
              'product-card__buttons-cart--addedToCart':
            isInCart(itemId),
            })}
          onClick={() => toggleToCart(itemId)}
        >
          Add to cart
        </button>

        <button
          type="button"
          className="product-card__buttons-favourites buttons"
          onClick={() => toggleToFavourites(itemId)}
        >
          {isInFavourites(itemId) ? (
            <img
              alt="filledFavourites"
              src="./img/filledFavourites.svg"
            />
          ) : (
            <img
              alt="favourites"
              src="./img/favourites.svg"
            />
          )}

        </button>
      </div>
    </li>
  );
};
