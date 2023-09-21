import { Link } from 'react-router-dom';
import { AddToCartButton } from '../Buttons/AddToCartButton';
import { AddToFav } from '../Buttons/AddToFav';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  return (
    <div
      className="card"
      data-cy="cardsContainer"
    >
      <Link to={`/${category}/${itemId}`} className="card__imgContainer">
        <img
          className="card__img"
          // src={`_new/${image}`}
          src={image}
          alt={name}
        />
      </Link>

      <div className="card__infoContaiter">
        <Link to={`/${category}/${itemId}`} className="card__title">
          {name}
        </Link>

        <div className="card__price">
          <p className="card__price--new">
            {`$${price}`}
          </p>
          <p className="card__price--old">{`$${fullPrice}`}</p>
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
          <AddToCartButton prodId={product.itemId} />
          <AddToFav prodId={product.itemId} />
        </div>
      </div>
    </div>
  );
};
