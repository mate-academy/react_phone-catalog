import { Product } from '../../types/Product';

type Props = {
  prod: Product;
};

export const ProductCard: React.FC<Props> = ({ prod }) => {
  const { name, fullPrice, image, screen, capacity, ram } = prod;

  return (
    <div className="productCard">
      <div className="productCard__box">
        <img src={image} alt={name} className="productCard__img" />
        <p className="productCard__name">{name}</p>
        <h3 className="productCard__price">{`$${fullPrice}`}</h3>
        <ul className="productCard__details">
          <li className="productCard__key">
            Screen
            <span className="productCard__value">{screen}</span>
          </li>

          <li className="productCard__key">
            Capacity
            <span className="productCard__value">{capacity}</span>
          </li>

          <li className="productCard__key">
            RAM
            <span className="productCard__value">{ram}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
