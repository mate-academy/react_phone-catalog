import { Link } from 'react-router-dom';
import { MainButton } from '../Buttons/MainButton';
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

  let categoryType = '';

  if (category === 'phones') {
    categoryType = 'phones';
  } else if (category === 'tablets') {
    categoryType = 'tablets';
  } else {
    categoryType = 'accessories';
  }

  return (

    <Link
      to={`/${categoryType}/${itemId}`}
      className="card"
      data-cy="cardsContainer"
    >
      <div className="card__imgContainer">
        <img
          className="card__img"
          src={`_new/${image}`}
          alt={name}
        />
      </div>

      <div className="card__infoContaiter">
        <h2 className="card__title">
          {name}
        </h2>

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
          <MainButton title="Add to cart" />

          <AddToFav />
        </div>
      </div>
    </Link>
  );
};
