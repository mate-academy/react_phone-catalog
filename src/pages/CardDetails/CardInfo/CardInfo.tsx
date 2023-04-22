import './CardInfo.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import CharsList from '../../../components/CharsList/CharList';
import FavButton from '../../../components/FavButton/FavButton';
import { createChars } from '../../../helpers/createChars';
import { CardDetail } from '../../../types/CardDetail';
import { Colors } from '../../../types/Colors';
import CartButton from '../../../components/CartButton/CartButton';
import { Product } from '../../../types/Product';

const charsList = ['Screen', 'Resolution', 'Processor', 'RAM'];

const capacityClasses = (currCapacity: string, capacity: string) => cn(
  'card-info__capacity__item',
  { 'card-info__capacity-active': currCapacity === capacity },
);

const colorClasses = (currColor: string, color: string) => cn(
  'card-info__colors__item',
  { 'card-info__colors-active': currColor === color },
);

type Props = {
  cardDetail: CardDetail;
  productCard: Product;
};

const CardInfo: React.FC<Props> = ({
  cardDetail: {
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    screen,
    resolution,
    processor,
    ram,
    namespaceId,
  },
  productCard,
}) => {
  const chars = createChars(
    charsList,
    [screen, resolution, processor, ram],
  );

  return (
    <div className="card-info">
      <div className="card-info__colors">
        <span className="card-info__colors__name">
          Available colors
        </span>
        <ul className="card-info__colors__list">
          {colorsAvailable.map(currColor => (
            <li
              key={currColor}
              className={colorClasses(currColor, color)}
            >
              <Link
                to={`/${productCard.category}/${namespaceId}-${capacity.toLocaleLowerCase()}-${currColor}`}
                style={{ backgroundColor: Colors[currColor] }}
                className="card-info__colors__link"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="line card-info__line" />

      <div className="card-info__capacity">
        <span className="card-info__capacity__name">
          Select capacity
        </span>
        <ul className="card-info__capacity__list">
          {capacityAvailable.map(currCapacity => (
            <li
              key={currCapacity}
              className={capacityClasses(currCapacity, capacity)}
            >
              <Link
                className="card-info__capacity__link"
                to={`/phones/${namespaceId}-${currCapacity}-${color}`}
              >
                {currCapacity}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="line card-info__line" />

      <div className="card-info__prices">
        <span className="card-info__price">
          {`$${priceDiscount}`}
        </span>
        <span className="card-info__full-price">
          {`$${priceRegular}`}
        </span>
      </div>

      <div className="card-info__buttons">
        <CartButton product={productCard} />
        <FavButton product={productCard} />
      </div>

      <CharsList list={chars} classes="card-info__chars" />
    </div>
  );
};

export default CardInfo;
