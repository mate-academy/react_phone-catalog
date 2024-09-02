import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import './PhoneCard.scss';

type Props = {
  product: Product;
};

export const PhoneCard = ({ product }: Props) => {
  return (
    <div className="phonescard">
      <Link
        to={`/phones/${product.itemId}`}
        className="phonescard__image--link"
      >
        <img
          className="phonescard__image"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <h2 className="phonescard__name">{product.name}</h2>
      <div className="phonescard__prices">
        <div className="phonescard__price">{`$${product.price}`}</div>
      </div>
      <div className="phonescard__line"></div>
      <div className="phonescard__description">
        <div className="phonescard__screen">
          <div className="phonescard__screen--title">Screen</div>
          <div className="phonescard__screen--value">{product.screen}</div>
        </div>
        <div className="phonescard__capacity">
          <div className="phonescard__capacity--title">Capacity</div>
          <div className="phonescard__capacity--value">{product.capacity}</div>
        </div>
        <div className="phonescard__ram">
          <div className="phonescard__ram--title">RAM</div>
          <div className="phonescard__ram--value">{product.ram}</div>
        </div>
      </div>
      <div className="phonescard__buttons">
        <button className="phonescard__adding-button">Add to cart</button>
        <button className="phonescard__button-with-heart"></button>
      </div>
    </div>
  );
};
