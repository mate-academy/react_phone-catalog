import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './ProductCard.scss';
import { StoragesContext } from '../../Context/StoragesContext';
import { ButtonAndLike } from '../ButtonAndLike/ButtonAndLike';
import { ButtonsSize } from '../../enum/ButtonsSize';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = phone;
  const {
    addedProducts,
    handleAddToLikeStorage,
    handleAddToCart,
  } = useContext(StoragesContext);
  const { search, pathname } = useLocation();

  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__img--error">
        <Link
          to={{ pathname: `/phones/${phoneId}` }}
          state={{ name, search, pathname }}
        >
          <img
            src={`./_new/${image}`}
            width={208}
            height={208}
            alt={name}
            className="card__img"
          />
        </Link>
      </div>

      <Link
        to={{ pathname: `/phones/${phoneId}` }}
        className="card__title"
        state={{ name, search, pathname }}
      >
        {name}
      </Link>

      <div className="card__price">
        <h2 className="card__price__actual">
          {`$${price}`}
        </h2>

        {fullPrice !== 0 && (
          <h2 className="card__price__deal">
            {fullPrice}
          </h2>
        )}
      </div>

      <ul className="card__list">
        <li className="card__item">
          <p className="card__item__title">
            Screen
          </p>

          <p className="card__item__charac">
            {screen}
          </p>
        </li>

        <li className="card__item">
          <p className="card__item__title">
            Capacity
          </p>

          <p className="card__item__charac">
            {capacity}
          </p>
        </li>

        <li className="card__item">
          <p className="card__item__title">
            RAM
          </p>

          <p className="card__item__charac">
            {ram}
          </p>
        </li>
      </ul>

      {!addedProducts.includes(phoneId) ? (
        <ButtonAndLike
          size={ButtonsSize.smallOn}
          handleLike={handleAddToLikeStorage}
          handleAdd={handleAddToCart}
          phoneId={phoneId}
        />
      ) : (
        <ButtonAndLike
          size={ButtonsSize.smallOff}
          handleLike={handleAddToLikeStorage}
          phoneId={phoneId}
        />
      )}
    </div>
  );
};
