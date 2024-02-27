import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { TypeCard } from '../../types/TypeCard';
import './ProductCard.scss';
import {
  addFavouritePhones,
  // addPhonesInCart,
  // addPhonesInCart,
  deleteFavouritePhones,
  // deletePhonesInCart,
  // deletePhonesInCart,
} from '../../features/favouritesSlice';
import { addPhonesInCart, deletePhonesInCart } from '../../features/cartSlice';

interface T {
  card: TypeCard;
  newPhone?: boolean;
}

export const ProductCard: React.FC<T> = ({ card, newPhone }) => {
  const dispatch = useAppDispatch();
  // const [ids, setIds] = useLocalStorage<TypeCard[]>('cart', []);

  const favouritesPhones = useAppSelector(
    (state) => state.favouritesPhones.favouritesPhones,
  );

  // const changeFavourites = () => {
  //   if (favouritesPhones.includes(card)) {
  //     dispatch(deleteFavouritePhones(card));

  //     return;
  //   }

  //   dispatch(addFavouritePhones(card));
  // };

  const oldFav = localStorage.getItem('favourites') || '';
  const newFav: TypeCard[] = JSON.parse(oldFav);

  // console.log(newFav.some(
  //   item => item.id === card.id,
  // ));

  console.log(favouritesPhones); // (Не актуально) якщо прибрати консол лог та масив обраних то чомусь не працює нічого

  const changeFavourites = () => {
    if (newFav.some(item => item.id === card.id)) {
      // localStorage.setItem('favourites', JSON.stringify(
      //   newFav.filter(item => item.id !== card.id),
      // ));
      dispatch(deleteFavouritePhones(card));

      return;
    }

    // if (oldFav) {
    //   newFav.push(card);
    //   localStorage.setItem('favourites', JSON.stringify(newFav));
    // } else {
    //   localStorage.setItem('favourites', JSON.stringify([card]));
    // }

    dispatch(addFavouritePhones(card));
  };

  // const changeCart = () => {
  //   if (phonesInCart.includes(card)) {
  //     dispatch(deletePhonesInCart(card));

  //     return;
  //   }

  //   dispatch(addPhonesInCart(card));
  // };

  const oldCart = localStorage.getItem('cart') || '';
  const newCart: TypeCard[] = JSON.parse(oldCart);

  const changeCart = () => {
    if (newCart.some(item => item.id === card.id)) {
      // localStorage.setItem('cart', JSON.stringify(
      //   newCart.filter(item => item.id !== card.id),
      // ));
      // setIds(ids.filter(item => item.id !== card.id));

      dispatch(deletePhonesInCart(card));

      return;
    }

    // setIds([...ids, card]);
    // if (oldCart) {
    //   newCart.push(card);
    //   localStorage.setItem('cart', JSON.stringify(newCart));
    // } else {
    //   localStorage.setItem('cart', JSON.stringify([card]));
    // }

    dispatch(addPhonesInCart(card));
  };

  return (
    <div className="card">
      <Link to={`/Phones/${card.phoneId}`} className="card__link">
        <img src={`_new/${card.image}`} alt="phone" className="card__img" />
        {/* У <link> есть кликабельная зона под img */}
      </Link>

      <div className="description">
        {/* <Link to={`/phones/${card.id}`} className="card__link"> */}
        <p className="description__name">{card.name}</p>

        <div className="description__price">
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
        {/* </Link> */}

        <div className="description__item small-text ">
          <p className="Screen">Screen</p>
          <p className="Screen__value">{card.screen}</p>
        </div>

        <div className="description__item small-text ">
          <p className="Capacity">Capacity</p>
          <p className="Capacity__value">{card.capacity}</p>
        </div>

        <div className="description__item small-text last-item">
          <p className="RAM">RAM</p>
          <p className="RAM__value">{card.ram}</p>
        </div>

        <div className="description__button">
          <button
            type="button"
            className={classNames('description-button', {
              // 'active-button': phonesInCart.some(item => item.id === card.id),
              'active-button': newCart.some(
                item => item.id === card.id,
              ),
              // 'active-button': ((localStorage.getItem('cart') || '') !== ''
              //   && JSON.parse(localStorage.getItem('cart') || '')
              //     .some((item: TypeCard) => item.id === card.id)),
            })}
            onClick={() => changeCart()}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={classNames('description-favorites', {
              // 'active-button': favouritesPhones.includes(card),
              'active-button': newFav.some(
                item => item.id === card.id,
              ),
              // 'active-button': ((localStorage.getItem('favourites') || '')
              //   !== ''
              //   && JSON.parse(localStorage.getItem('favourites') || '')
              //     .some((item: TypeCard) => item.id === card.id)),
            })}
            onClick={() => changeFavourites()}
            data-cy="addToFavorite"
          >
            {newFav.some(
              item => item.id === card.id,
            )
              ? (
                <img
                  src="img/Red-heart.png"
                  alt="Heart"
                  className="favourites-img"
                />
              ) : (
                <img
                  src="img/heart.png"
                  alt="Heart"
                />
              )}
          </button>
        </div>
      </div>
    </div>
  );
};
