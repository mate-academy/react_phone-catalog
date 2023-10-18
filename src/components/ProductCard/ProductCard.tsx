import { Link, useLocation } from 'react-router-dom';
import './ProductCard.scss';
import { Phone } from '../../types/Phone';
import { CardButtons } from '../CardButtons';

type Props = {
  card: Phone;
};

export const ProductCard: React.FC<Props> = ({ card }) => {
  const { pathname, search } = useLocation();
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = card;

  return (
    <div className="card">
      <Link
        to={`/phones/${phoneId}`}
        state={{ pathname, search }}
      >
        <img
          className="card__image"
          src={`./new/${image}`}
          alt={name}
        />
      </Link>

      <Link
        to={`/phones/${phoneId}`}
        state={{ pathname, search }}
        className="card__name"
      >
        {name}
      </Link>

      <div className="card__prices">
        <h2 className="card__price">{`$${price}`}</h2>
        {fullPrice !== 0 && (
          <div className="card__full-price">{`$${fullPrice}`}</div>
        )}
      </div>

      <div className="card__line" />

      <div className="card__info-wrapper">
        <div className="card__info">
          <div className="card__char-name">Screen</div>
          <div className="card__char">{screen}</div>
        </div>
        <div className="card__info">
          <div className="card__char-name">Capacity</div>
          <div className="card__char">{capacity.replace('GB', ' GB')}</div>
        </div>
        <div className="card__info">
          <div className="card__char-name">RAM</div>
          <div className="card__char">{ram.replace('GB', ' GB')}</div>
        </div>
      </div>

      <CardButtons card={card} info="card" />
    </div>
  );
};
