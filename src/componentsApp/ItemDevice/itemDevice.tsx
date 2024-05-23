/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import './itemDevice.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../context/ContextReducer';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablets';
import { Accessorie } from '../../types/accessories';

interface Props {
  device: Phone | Tablet | Accessorie;
  discount: boolean;
}

export const BrandItem: React.FC<Props> = ({ device, discount }) => {
  const {
    images,
    priceRegular,
    screen,
    capacity,
    ram,
    name,
    priceDiscount,
    id,
  } = device;
  const dispatch = useContext(DispatchContext);
  const {
    favoritesDevice: favoritesPhone,
    cartPhone,
    darkThem,
  } = useContext(StateContext);
  const { pathname } = useLocation();
  const { productId } = useParams();

  const linkNewProduct = (p: string, idItem: string) => {
    if (productId && p.includes(productId)) {
      return p.replace(productId, id);
    }

    return idItem;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={cn('BrandItem', { dark: darkThem })}>
      <Link
        onClick={() => window.scrollTo(0, 0)}
        className="Link__BradItem"
        to={linkNewProduct(pathname, id)}
      >
        <img
          className="BrandItem__img"
          src={`https://olehmarushchak.github.io/react_phone-catalog/${images[0]}`}
          alt="device-img"
        />

        <h4 className={cn('BrandItem__title', { dark: darkThem })}>{name}</h4>

        <div className="BrandItem__prices">
          <p
            className={cn('BrandItem__price', { dark: darkThem })}
          >{`$${priceDiscount}`}</p>
          {discount && (
            <p className="BrandItem__price__discount">{`$${priceRegular}`}</p>
          )}
        </div>
      </Link>

      <div className={cn('BrandItem__bottom', { dark: darkThem })}>
        <div className="BrandItem__bottom__Screen">
          <p className="BrandItem__bottom__title">Screen</p>
          <p className={cn('BrandItem__bottom__param', { dark: darkThem })}>
            {screen}
          </p>
        </div>

        <div className="BrandItem__bottom__Capacity">
          <p className="BrandItem__bottom__title">Capacity</p>
          <p className={cn('BrandItem__bottom__param', { dark: darkThem })}>
            {capacity}
          </p>
        </div>

        <div className="BrandItem__bottom__RAM">
          <p className="BrandItem__bottom__title">RAM</p>
          <p className={cn('BrandItem__bottom__param', { dark: darkThem })}>
            {ram}
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'addCart', payload: device })}
          className={cn(
            'BrandItem__bottom__buttons BrandItem__bottom__buttons--AddItem',
            {
              'is-active': cartPhone?.find(p => p.id === device.id),
              dark: darkThem,
            },
          )}
        >
          Add to cart
        </button>

        <button
          onClick={() => dispatch({ type: 'addFavorites', payload: device })}
          className={cn(
            'BrandItem__bottom__buttons BrandItem__bottom__buttons--AddFavourites',
            {
              'is-active': favoritesPhone?.find(p => p.id === device.id),
              dark: darkThem,
            },
          )}
        ></button>
      </div>
    </div>
  );
};
