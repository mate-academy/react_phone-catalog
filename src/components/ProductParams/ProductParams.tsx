import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PhoneDetail } from '../../types/PhoneDetail';
import { ColorPallette } from '../../types/Color';
import { useAppDispatch, useAppSelector } from '../../helpers/hook';
import { addCart, removeCart } from '../../helpers/cartSlice';
import { addFavourites, removeFavourites } from '../../helpers/favouritesSlice';
import { Phone } from '../../types/Phone';
import { checkPhoneDetailsId } from '../../helpers/checkedStorage';

import './ProductParams.scss';

type Props = {
  colors: string[];
  currentCapacity: string;
  nameId: string;
  currentColor: string;
  phone: PhoneDetail;
  capacities: string[];
  phoneId: string;
  phones: Phone[];
};

export const ProductParams: React.FC<Props> = ({
  colors,
  currentCapacity,
  nameId,
  currentColor,
  phone,
  capacities,
  phoneId,
  phones,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);

  const find = phones.find(currentPhone => currentPhone.phoneId === phoneId);
  let phoneToStorage: Phone;

  if (find) {
    phoneToStorage = find;
  }

  const handleCartToggle = (phoneToCart: Phone) => {
    if (checkPhoneDetailsId(phoneId, cart) === undefined) {
      dispatch(addCart(phoneToCart));
    } else {
      dispatch(removeCart(phoneToCart));
    }
  };

  const handleFavouritesToggle = (phoneToFavourites: Phone) => {
    if (checkPhoneDetailsId(phoneId, favourites) === undefined) {
      dispatch(addFavourites(phoneToFavourites));
    } else {
      dispatch(removeFavourites(phoneToFavourites));
    }
  };

  return (
    <div className="params">
      <div className="params__color">
        <p className="params__color--heading">Available colors</p>

        <div className="colors__list">
          {colors.map(color => (
            <div
              key={color}
              className="colors__item"
            >
              <div
                className={classNames('colors__border', {
                  'colors__border--selected': color === currentColor,
                })}
              >
                <Link
                  to={`/Phones/${nameId}-${currentCapacity.toLocaleLowerCase()}-${color}`}
                  className="colors__circle"
                  style={{ backgroundColor: `${ColorPallette[color]}` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="params__capacity">
        <p className="params__capacity--heading">Select capacity</p>

        <div className="capacities__list">
          {capacities.map(capacity => (
            <Link
              to={`/Phones/${nameId}-${capacity.toLocaleLowerCase()}-${currentColor}`}
              className={classNames('capacities__link', {
                'capacities__link--selected': capacity === currentCapacity,
              })}
              key={capacity}
            >
              {capacity}
            </Link>
          ))}
        </div>
      </div>
      <div className="params__shop">
        <div className="params__shop__price">
          <h2 className="params__shop__price--current">{`$${phone.priceDiscount}`}</h2>
          <h2 className="params__shop__price--discount">{`$${phone.priceRegular}`}</h2>
        </div>

        <div className="params__shop__button">
          {checkPhoneDetailsId(phoneId, cart) ? (
            <button
              type="button"
              className="params__shop__button--isActive"
              onClick={() => handleCartToggle(phoneToStorage)}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className="params__shop__button--add"
              onClick={() => handleCartToggle(phoneToStorage)}
            >
              Add to cart
            </button>
          )}
          <button
            type="button"
            aria-label="Mute volume"
            className="params__shop__button--favourites-wrapper"
            onClick={() => handleFavouritesToggle(phoneToStorage)}
          >
            <div
              className={classNames('product__button--favourites', {
                'product__button--favourites--isActive': checkPhoneDetailsId(
                  phoneId,
                  favourites,
                ),
              })}
            />
          </button>
        </div>
      </div>
      <div className="params__description">
        <div className="params__description--specs">
          <p className="params__description--name">Screen</p>

          <p className="params__description--value">{phone?.screen}</p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">Resolution</p>

          <p className="params__description--value">{phone?.resolution}</p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">Processor</p>

          <p className="params__description--value">{phone?.processor}</p>
        </div>

        <div className="params__description--specs">
          <p className="params__description--name">RAM</p>

          <p className="params__description--value">{phone?.ram}</p>
        </div>
      </div>
    </div>
  );
};
