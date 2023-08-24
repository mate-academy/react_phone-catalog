import { MainButton } from '../Buttons/MainButton';
import { AddToFav } from '../Buttons/AddToFav';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const priceAfterDiscount = price - price * (discount / 100);

  return (
    <div
      className="card card--slider"
      data-cy="cardsContainer"
    >
      <div className="card__imgContainer">
        <img
          className="card__img"
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="card__infoContaiter">
        <h2 className="card__title">
          {name}
        </h2>

        <div className="card__price">
          <p className="card__price--new">
            {`$${discount ? priceAfterDiscount : price}`}
          </p>
          {!!discount && (
            <p className="card__price--old">{`$${price}`}</p>
          )}
        </div>

        <div className="card__description">
          <div className="card__description--line">
            <p className="card__description--key">Screen</p>
            <p className="card__description--val">{screen}</p>
          </div>

          <div className="card__description--line">
            <p className="card__description--key">Capacity</p>
            <p className="card__description--val">{capacity}</p>
          </div>

          <div className="card__description--line">
            <p className="card__description--key">RAM</p>
            <p className="card__description--val">{ram}</p>
          </div>
        </div>

        <div className="card__buttonContaiter">
          <MainButton title="Add to cart" />

          <AddToFav />
        </div>
      </div>
    </div>
  );
};
