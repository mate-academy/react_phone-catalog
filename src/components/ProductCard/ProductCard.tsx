import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { TypeCard } from '../../types/TypeCard';
import './ProductCard.scss';
import { useCartPhones, useFavouritesPhones } from '../../helpers/useArrays';

interface T {
  card: TypeCard;
  newPhone?: boolean;
}

export const ProductCard: React.FC<T> = ({ card, newPhone }) => {
  const favouritesPhones = useAppSelector(
    (state) => state.favouritesPhones.favouritesPhones,
  );

  const cartPhones = useAppSelector(
    (state) => state.cartPhones.phonesInCart,
  );

  const changeCart = useCartPhones();

  const changeFavourites = useFavouritesPhones();

  return (
    <div className="card">
      <Link to={`/Phones/${card.phoneId}`} className="card__link">
        <img src={`https://mate-academy.github.io/react_phone-catalog/_new/${card.image}`} alt="phone" className="card__img" />
        {/* У <link> есть кликабельная зона под img */}
      </Link>

      <div className="card__description">
        <Link to={`/phones/${card.phoneId}`}>
          <p className="card__description__name">{card.name}</p>
        </Link>

        <div className="card__description__price">
          {newPhone ? (
            <>
              <h2 className="price">{`$${card.price}`}</h2>
              <p className="discount">{`$${card.fullPrice}`}</p>
            </>
          ) : (
            <>
              <h2 className="price">{`$${card.fullPrice}`}</h2>
            </>
          )}
        </div>

        <div className="card__description__item small-text ">
          <p className="Screen">Screen</p>
          <p className="Screen__value">{card.screen}</p>
        </div>

        <div className="card__description__item small-text ">
          <p className="Capacity">Capacity</p>
          <p className="Capacity__value">{card.capacity}</p>
        </div>

        <div className="card__description__item small-text last-item">
          <p className="RAM">RAM</p>
          <p className="RAM__value">{card.ram}</p>
        </div>

        <div className="card__description__button">
          <button
            type="button"
            className={classNames('card__description-button', {
              'active-button': cartPhones.some(
                item => item.id === card.id,
              ),
            })}
            onClick={() => changeCart(card)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={classNames('card__description-favorites', {
              'active-button': favouritesPhones.some(
                item => item.id === card.id,
              ),
            })}
            onClick={() => changeFavourites(card)}
            data-cy="addToFavorite"
          >
            {favouritesPhones.some(
              item => item.id === card.id,
            )
              ? (
                <img
                  src="/img/Red-heart.png"
                  alt="Heart"
                  className="favourites-img"
                />
              ) : (
                <img
                  src="/img/heart.png"
                  alt="Heart"
                />
              )}
          </button>
        </div>
      </div>
    </div>
  );
};
