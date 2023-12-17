import classNames from 'classnames';
import { useMyContext } from '../context/context';
import { Product } from '../helpers/Types';

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
      className="productCard"
      style={ProductSlider}
    >
      <img className="productCard__image" alt={itemId} src={`_new/${image}`} />
      <p className="productCard__name BodyText">{name}</p>
      <h2 className="productCard__price h2">
        {`$${price}`}
        <span className="productCard__price-fullPrice h2">
          {`$${fullPrice}`}
        </span>
      </h2>
      <div className="productCard__line" />

      <div className="productCard__details">
        <span className="productCard__details-label SmallText">Screen</span>
        <span className="productCard__details-value SmallText">{screen}</span>
      </div>
      <div className="productCard__details">
        <span className="productCard__details-label SmallText">Capacity</span>
        <span className="productCard__details-value SmallText">
          {capacity}
        </span>
      </div>
      <div className="productCard__details">
        <span className="productCard__details-label SmallText">RAM</span>
        <span className="productCard__details-value SmallText">{ram}</span>
      </div>
      <div className="productCard__buttons">
        <button
          type="button"
          className={classNames('productCard__buttons-cart',
            'buttons',
            {
              'productCard__buttons-cart--addedToCart':
            isInCart(itemId),
            })}
          onClick={() => toggleToCart(itemId)}
        >
          Add to cart
        </button>

        <button
          type="button"
          className="productCard__buttons-favourites buttons"
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
