import { TypeCard } from '../../types/TypeCard';
import './ProductCard.scss';

interface T {
  card: TypeCard
}

export const ProductCard: React.FC<T> = ({ card }) => {
  return (
    <div className="card">
      <img src={`_new/${card.image}`} alt="phone" className="card__img" />

      <div className="description">
        <p className="description__name">{card.name}</p>

        <div className="description__price">
          <h2 className="price">{`$${card.price}`}</h2>
          <p className="discount">{`$${card.fullPrice}`}</p>
        </div>

        <div className="description__item">
          <p className="Screen">Screen</p>
          <p className="Screen__value">{card.screen}</p>
        </div>

        <div className="description__item">
          <p className="Capacity">Capacity</p>
          <p className="Capacity__value">{card.capacity}</p>
        </div>

        <div className="description__item last-item">
          <p className="RAM">RAM</p>
          <p className="RAM__value">{card.ram}</p>
        </div>

        <div className="description__button">
          <button
            type="button"
            className="description-button"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="description-favorites"
          >
            s
          </button>
        </div>
      </div>
    </div>
  );
};
