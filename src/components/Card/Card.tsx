import { Phone } from '../../types';
import './Card.scss';

type Props = {
  item: Phone; // now phone
};

export const Card: React.FC<Props> = ({ item }) => {
  return (
    <article className="card">
      <div className="card__container">
        <a href="#" className="card__link--photo-link">
          <img
            src={item.images[0].slice(1)}
            alt="apple-iphone-11"
            className="card__link--photo"
          />
        </a>
        <a href="#" className="card__link--name-link body-text">
          <div>{item.name}</div>
        </a>
        <h3 className="card__price">{`$${item.priceRegular}`}</h3>
        <div className="card__separator"></div>
        <ul className="card__list">
          <li className="card__list--item">
            <p className="card__list--name small-text">Screen</p>
            <p className="card__list--value">{item.screen.slice(0, 9)}</p>
          </li>
          <li className="card__list--item">
            <p className="card__list--name small-text">Capacity</p>
            <p className="card__list--value">{item.capacity}</p>
          </li>
          <li className="card__list--item">
            <p className="card__list--name small-text">RAM</p>
            <p className="card__list--value">{item.ram}</p>
          </li>
        </ul>
        <div className="card__buttons">
          <button className="card__button--add button">Add to cart</button>
          <button className="card__button--prefer icon button"></button>
        </div>
      </div>
    </article>
  );
};
