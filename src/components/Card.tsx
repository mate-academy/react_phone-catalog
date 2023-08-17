import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { FavoriteButton } from './FavoriteButton';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  item: Product,
  hasDiscont?: boolean,
};

export const Card: React.FC<Props> = ({ item, hasDiscont }) => {
  const {
    id,
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = item;

  const correctUrl = `new/${image}`;

  return (
    <div className="card link-style" key={itemId}>
      <Link to={`/phones/${itemId}`} className="card__header">
        <img
          className="card__header__image"
          src={correctUrl}
          alt={name}
        />
      </Link>
      <div>
        <div className="card__name">
          <p className="text__body card__name__title">{name}</p>

          <div className="card__price">
            <h2 className="card__price__new">
              {`$${price}`}
            </h2>
            {hasDiscont && (
              <h2 className="card__price__old">
                {`$${fullPrice}`}
              </h2>
            )}
          </div>
          <div />
        </div>

        <div className="card__info">
          <div />
          <div className="card__params text__small">
            <div className="card__params__line">
              <p className="card__params__title">Screen</p>
              <p className="card__params__data">{screen}</p>
            </div>

            <div className="card__params__line">
              <p className="card__params__title">Capacity</p>
              <p className="card__params__data">
                {capacity}
              </p>
            </div>

            <div className="card__params__line">
              <p className="card__params__title">RAM</p>
              <p className="card__params__data">
                {ram}
              </p>
            </div>
          </div>

          <div className="card__footer">
            <AddToCartButton id={id} />
            <FavoriteButton id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
