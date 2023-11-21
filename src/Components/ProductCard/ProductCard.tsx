import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Phone } from '../../Type/Phone';
import './productCard.scss';
import { BASE_URL } from '../../utils/BASE_URL';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addFavourites,
  removeFavourites,
} from '../../features/favouritesSlice';
import { addCart, removeCart } from '../../features/cartSlice';
import { checkPhoneId } from '../../helper/checkedSorage';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const dispatch = useAppDispatch();
  const favouritesPhone = useAppSelector(state => state.favourites);
  const cartInStorage = useAppSelector(state => state.cart);

  const checkStorageCart = (phoneToStorage: Phone) => {
    const check = checkPhoneId(phone, cartInStorage);

    if (check === undefined) {
      dispatch(addCart(phoneToStorage));
    } else {
      dispatch(removeCart(phoneToStorage));
    }
  };

  const checkStorageFavourites = (phoneToStorage: Phone) => {
    const check = checkPhoneId(phone, favouritesPhone);

    if (check === undefined) {
      dispatch(addFavourites(phoneToStorage));
    } else {
      dispatch(removeFavourites(phoneToStorage));
    }
  };

  return (
    <div className="product__card phones__list--card">
      <Link
        className="phoneDetails"
        to={`/Phones/${phone.phoneId}`}
      >
        <div className="product__photo">
          <img
            className="product__photo--img"
            src={`${BASE_URL}/_new/${phone.image}`}
            alt={phone.phoneId}
          />
        </div>
      </Link>

      <div className="product__description">
        <p className="product__text--body">
          {phone.name}
        </p>

        <div className="product__price">
          <h2 className="product__price--current">{`$${phone.price}`}</h2>
          <h2 className="product__price--discount">{`$${phone.fullPrice}`}</h2>
        </div>

        <div className="product__screen">
          <p className="product__screen--name">Screen</p>
          <p className="product__screen--value">{phone.screen}</p>
        </div>

        <div className="product__capacity">
          <p className="product__capacity--name">Capacity</p>
          <p className="product__capacity--value">{phone.capacity}</p>
        </div>

        <div className="product__ram">
          <p className="product__ram--name">RAM</p>
          <p className="product__ram--value">{phone.ram}</p>
        </div>

        <div className="product__button">
          {checkPhoneId(phone, cartInStorage)
            ? (
              <button
                type="button"
                className="product__button--isActive"
                onClick={() => checkStorageCart(phone)}
              >
                Added to cart
              </button>
            )
            : (
              <button
                type="button"
                className="product__button--add"
                onClick={() => checkStorageCart(phone)}
              >
                Add to cart
              </button>
            )}
          <button
            type="button"
            aria-label="Mute volume"
            className="product__button--favourites-wrapper"
            onClick={() => checkStorageFavourites(phone)}
          >
            <div className={classNames('product__button--favourites', {
              'product__button--favourites--isActive': checkPhoneId(
                phone, favouritesPhone,
              ),
            })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
