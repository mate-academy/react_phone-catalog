import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { DetailsPhone } from '../../type/DetailsPhone';
import { ColorPallette } from '../../type/Colors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Phone } from '../../type/Phone';
import * as cartAction from '../../feature/cartSlice';
import * as favoriteAction from '../../feature/favoritesSlice';

type Props = {
  phone: DetailsPhone | null;
  phoneN: Phone | null;
};

export const ProductOption: React.FC<Props> = ({ phone, phoneN }) => {
  const { phoneId } = useParams();
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToFavorite, setAddedToFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const { cart, favorites } = useAppSelector(store => store);

  const addCard = (item: Phone | null) => {
    if (item) {
      dispatch(cartAction.addCart(item));
    }
  };

  const deleteCard = (item: Phone) => {
    dispatch(cartAction.removeCart(item));
  };

  const addFavorite = (item: Phone | null) => {
    if (item) {
      dispatch(favoriteAction.addFavorites(item));
    }
  };

  const deleteFavorite = (item: Phone) => {
    dispatch(favoriteAction.removeFavorites(item));
  };

  useEffect(() => {
    if (phoneN) {
      if (cart.some(item => item.id === phoneN.id)) {
        setAddedToCart(true);
      } else {
        setAddedToCart(false);
      }

      if (favorites.some(item => item.id === phoneN.id)) {
        setAddedToFavorite(true);
      } else {
        setAddedToFavorite(false);
      }
    }
  }, [cart, favorites]);

  const phoneOpption = phoneId?.split('-');
  const link = `/phones/${phoneId?.split('-').slice(0, -2).join('-')}`;
  const capacityCurrent = phoneOpption && phoneOpption[phoneOpption.length - 2];
  const colorCurrent = phoneOpption && phoneOpption[phoneOpption.length - 1];

  return (
    <div
      className="productOption"
      data-cy="productDescription"
    >
      <div className="productOption__colorsContainer">
        <h3 className="productOption__titleH3">Available colors</h3>

        <ul className="productOption__colors">
          {phone && (
            phone.colorsAvailable.map(color => {
              return (
                <li
                  key={color}
                  className={classNames(
                    'productOption__color',
                    {
                      'productOption__color--isActive': color === colorCurrent,
                    },
                  )}
                  style={{
                    backgroundColor: ColorPallette[color],
                  }}
                >
                  <Link
                    to={`${link}-${capacityCurrent}-${color}`}
                    className="productOption__colorInside"
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="productOption__capacityContainer">
        <h3 className="productOption__titleH3">Select capacity</h3>

        <ul className="productOption__capacities">
          {phone?.capacityAvailable.map(capacity => (
            <li
              key={capacity}
            >
              <Link
                to={`${link}-${capacity.toLowerCase()}-${colorCurrent}`}
                className={classNames(
                  'productOption__capacity',
                  {
                    'productOption__capacity--isActive':
                      capacity.toLowerCase() === capacityCurrent,
                  },
                )}
              >
                {capacity}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="productOption__priceSection">
        <div className="productOption__prices">
          {phone && phone?.priceRegular < 1200
            ? (
              <div className="productOption__price">
                <span className="productOption__fullPrice">{`$${phone.priceDiscount}`}</span>
                <span className="productOption__discountedPrice">{`$${phone.priceRegular}`}</span>
              </div>
            )
            : (
              <div className="productOption__price">
                <span className="productOption__fullPrice">{`$${phone?.priceRegular}`}</span>
              </div>
            )}
        </div>

        <div className="productOption__action">
          {addedToCart && phoneN
            ? (
              <button
                type="button"
                className={classNames(
                  'productOption__addToCard',
                  'productOption__addToCard--selected',
                )}
                onClick={() => deleteCard(phoneN)}
              >
                Added to cart
              </button>
            )
            : (
              <button
                type="button"
                className={classNames(
                  'productOption__addToCard',
                )}
                onClick={() => addCard(phoneN)}
              >
                Add to cart
              </button>
            )}

          {addedToFavorite && phoneN
            ? (
              <button
                type="button"
                className={classNames(
                  'productOption__addToFavorite',
                  'productOption__addToFavorite--selected',
                )}
                onClick={() => deleteFavorite(phoneN)}
              >
                <img
                  src="./images/icons/FavouritesSelected.svg"
                  alt="Favourites Selected"
                  className="icon"
                />
              </button>
            )
            : (
              <button
                type="button"
                className={classNames(
                  'productOption__addToFavorite',
                )}
                onClick={() => addFavorite(phoneN)}
              >
                <img
                  src="./images/icons/Favourites.svg"
                  alt="Favourites"
                  className="icon"
                />
              </button>
            )}
        </div>
      </div>

      <div className="productOption__infoSection">
        <div className="productOption__infoLeft">
          <span className="productOption__infoLeftP">Screen</span>
          <span className="productOption__infoLeftP">Resolution</span>
          <span className="productOption__infoLeftP">Processor</span>
          <span className="productOption__infoLeftP">RAM</span>
        </div>

        <div className="productOption__infoRight">
          <p className="productOption__infoRightP">{phone?.screen}</p>
          <p className="productOption__infoRightP">{phone?.resolution}</p>
          <p className="productOption__infoRightP">{phone?.processor}</p>
          <p className="productOption__infoRightP">{phone?.ram}</p>
        </div>
      </div>
    </div>
  );
};
