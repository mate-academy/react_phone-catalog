import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './ProductCard.scss';
import { BASE_URL } from '../../utils/BASE_URL';
import { useAppDispatch, useAppSelector } from '../../helpers/hook';
import { addFavourites, removeFavourites } from '../../helpers/favouritesSlice';
import { addCart, removeCart } from '../../helpers/cartSlice';
import { checkPhoneId } from '../../helpers/checkedStorage';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const {
    phoneId,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = phone;
  const dispatch = useAppDispatch();
  const favouritesPhone = useAppSelector(state => state.favourites);
  const cartInStorage = useAppSelector(state => state.cart);

  const isPhoneInCart = checkPhoneId(phone, cartInStorage);
  const isPhoneInFavourites = checkPhoneId(phone, favouritesPhone);

  const handleCartButtonClick = () => {
    if (isPhoneInCart) {
      dispatch(removeCart(phone));
    } else {
      dispatch(addCart(phone));
    }
  };

  const handleFavouritesButtonClick = () => {
    if (isPhoneInFavourites) {
      dispatch(removeFavourites(phone));
    } else {
      dispatch(addFavourites(phone));
    }
  };

  return (
    <div className="product__card phones__list--card">
      <Link
        className="phoneDetails"
        to={`/Phones/${phoneId}`}
      >
        <div className="product__photo">
          <img
            className="product__photo--img"
            src={`${BASE_URL}/_new/${image}`}
            alt={phoneId}
          />
        </div>
      </Link>

      <div className="product__description">
        <p className="product__text--body">{name}</p>

        <div className="product__price">
          <h2 className="product__price--current">{`$${price}`}</h2>
          <h2 className="product__price--discount">{`$${fullPrice}`}</h2>
        </div>

        <div className="product__screen">
          <p className="product__screen--name">Screen</p>
          <p className="product__screen--value">{screen}</p>
        </div>

        <div className="product__capacity">
          <p className="product__capacity--name">Capacity</p>
          <p className="product__capacity--value">{capacity}</p>
        </div>

        <div className="product__ram">
          <p className="product__ram--name">RAM</p>
          <p className="product__ram--value">{ram}</p>
        </div>

        <div className="product__button">
          {checkPhoneId(phone, cartInStorage) ? (
            <button
              type="button"
              className="product__button--isActive"
              onClick={handleCartButtonClick}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className="product__button--add"
              onClick={handleCartButtonClick}
            >
              Add to cart
            </button>
          )}
          <button
            type="button"
            aria-label="Mute volume"
            className="product__button--favourites-wrapper"
            onClick={handleFavouritesButtonClick}
          >
            <div
              className={classNames('product__button--favourites', {
                'product__button--favourites--isActive': checkPhoneId(
                  phone,
                  favouritesPhone,
                ),
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
