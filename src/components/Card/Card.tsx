import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

import { Product } from '../../types/Product';
import { createChars } from '../../helpers/createChars';

import CharsList from '../CharsList/CharList';
import FavButton from '../FavButton/FavButton';
import CartButton from '../CartButton/CartButton';

const chars = [
  'Screen',
  'Capacity',
  'RAM',
];

type Props = {
  product: Product;
};

const Card: React.FC<Props> = ({
  product: {
    category,
    phoneId,
    name,
    price,
    fullPrice,
    image,
    ram,
    capacity,
    screen,
  },
  product,
}) => {
  const charsList = useMemo(() => {
    return createChars(chars, [screen, capacity, ram]);
  }, [screen, capacity, ram, createChars, chars]);

  return (
    <div className="card" data-cy="cardsContainer">
      <Link to={`/${category}/${phoneId}`}>
        <img className="card__img" src={image} alt="product" />
        <h3 className="card__name">
          {name}
        </h3>
      </Link>

      <div className="card__prices">
        <span className="card__price">
          {`$${price}`}
        </span>
        <span className="card__full-price">
          {`$${fullPrice}`}
        </span>
      </div>

      <div className="line card__line" />

      <CharsList classes="card__chars" list={charsList} />

      <div className="card__buttons">
        <CartButton product={product} />
        <FavButton product={product} />
      </div>
    </div>
  );
};

export default Card;
