import { Phone } from '../../Types/Phone';

type Props = {
  card: Phone,
  discount: boolean,
};

export const Card: React.FC<Props> = ({ card, discount }) => {
  return (
    <div className="card" key={card.id}>
      <img className="card__image" src={card.image} alt="phone_image" />
      <h3 className="card__name">{card.name}</h3>
      <div className="card__price">
        {discount ? (
          <>
            <p className="card__hot-price">{`$${card.price}`}</p>
            <p className="card__full-price">{`$${card.fullPrice}`}</p>
          </>
        ) : (
          <p className="card__hot-price">{`$${card.fullPrice}`}</p>
        )}
      </div>
      <div className="card__info">
        <div className="card__row">
          <p className="card__char-name">Screen</p>
          <p className="card__char-value">{card.screen}</p>
        </div>
        <div className="card__row">
          <p className="card__char-name">Capacity</p>
          <p className="card__char-value">{card.capacity}</p>
        </div>
        <div className="card__row">
          <p className="card__char-name">RAM</p>
          <p className="card__char-value">{card.ram}</p>
        </div>
      </div>
      <div className="card__button">
        <a className="card__link" href="/">Add to cart</a>
        <div className="card__icon" />
      </div>
    </div>
  );
};
