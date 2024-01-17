import { TypeCard } from '../../types/TypeCard';

interface T {
  card: TypeCard
}

export const ProductCard: React.FC<T> = ({ card }) => {
  return (
    <div data-cy="cardsContainer">
      <div className="card">
        <img src={card.imageUrl} alt="phone" />
      </div>

      <div className="description">
        <p className="description__name">{card.name}</p>

        <p className="description__price">{`$${card.price}`}</p>
        <p className="description__discount">{`$${card.discount}`}</p>

        <div className="discount__item">
          <p className="Screen">Screen</p>
          <p className="Screen__value">{card.screen}</p>
        </div>

        <div className="discount__item">
          <p className="Capacity">Capacity</p>
          <p className="Capacity__value">{card.capacity}</p>
        </div>

        <div className="discount__item">
          <p className="RAM">RAM</p>
          <p className="RAM__value">{card.ram}</p>
        </div>
      </div>
    </div>
  );
};
