/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { addFavourite, removeFavourite } from '../../features/favouriteSlice';
import { addWithdraw, deleteWithdraw } from '../../features/withdrawSlice';
import { ItemDetails } from '../../types/ItemDetails';
import { Phone } from '../../types/Phone';
import { BASE_URL, getCurrPhone, getPhones } from '../../utils/api';
import { ItemCarousel } from '../ItemCarousel';
import { Path } from '../Path';

import './ItemPage.scss';

type ActiveImgId = {
  prevVal: number,
  currVal: number,
};

const colors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];
const capacity = [64, 256, 512];

export const ItemPage: React.FC = () => {
  const [currPhoneAllSpecs, setCurrPhoneAllSpecs] = useState<ItemDetails>();
  const [currPhone, setCurrPhone] = useState<Phone>();
  const [currColor, setCurrColor] = useState(colors[0]);
  const [currCapacity, setCurrCapacity] = useState(capacity[0]);
  const [activeImgId, setActiveImgId] = useState<ActiveImgId>({
    prevVal: 0,
    currVal: 0,
  });
  const [similarPhones, setSimilarPhones] = useState<Phone[]>([]);

  const pathParts = window.location.hash.slice(2).split('/');

  const dispatch = useAppDispatch();

  const favourites = useAppSelector((state: RootState) => (
    state.favorite.favorites
  ));

  const withdraw = useAppSelector((state: RootState) => (
    state.withdraw.withdraw));

  const isWithdraw = useMemo(() => {
    return currPhone ? Object.keys(withdraw).includes(currPhone.id) : false;
  }, [withdraw, currPhone]);

  const isFavorite = useMemo(() => {
    return currPhone ? favourites.includes(currPhone.id) : false;
  }, [favourites, currPhone]);

  const buttonHandle = (place: string) => {
    if (currPhone) {
      if (place === 'favorite') {
        if (isFavorite) {
          dispatch(removeFavourite(currPhone.id));
        } else {
          dispatch(addFavourite(currPhone.id));
        }
      } else if (place === 'withdraw') {
        if (isWithdraw) {
          dispatch(deleteWithdraw(currPhone.id));
        } else {
          dispatch(addWithdraw(currPhone));
        }
      }
    }
  };

  useEffect(() => {
    getCurrPhone(pathParts[1]).then(phone => setCurrPhoneAllSpecs(phone));
    getPhones().then(phones => {
      setCurrPhone(phones.find((phone: Phone) => phone.id === pathParts[1]));
      setSimilarPhones(phones.slice(5, 10));
    });
  }, []);

  const clickOnImgHandle = (id: number) => {
    setActiveImgId({
      prevVal: id,
      currVal: id,
    });
  };

  const onMouseEnterHandle = (id: number) => {
    setActiveImgId(curr => ({
      ...curr,
      currVal: id,
    }));
  };

  const onMouseLeaveHandle = () => {
    setActiveImgId(curr => ({
      ...curr,
      currVal: curr.prevVal,
    }));
  };

  const changeColorHandle = (color: string) => {
    setCurrColor(color);
  };

  const changeCapacityHandle = (value: number) => {
    setCurrCapacity(value);
  };

  return (
    <section className="itemPage">
      {currPhoneAllSpecs && currPhone && (
        <>
          <Path pathElems={pathParts} pathBoldElems={pathParts.slice(0, -1)} />
          <Link
            to={`/${pathParts[0]}`}
            className="itemPage__back"
          >
            <div className="itemPage__back-img" />
            Back
          </Link>

          <h1 className="itemPage__title">
            {currPhoneAllSpecs.name}
          </h1>

          <div className="grid itemPage__section">
            <div className="grid__item grid__item-1-2 itemPage__photos">
              {currPhoneAllSpecs.images.map((img, id) => (
                <img
                  src={`${BASE_URL}/${img}`}
                  className={classNames(
                    'itemPage__secondaryPhoto',
                    {
                      'itemPage__secondaryPhoto--active':
                        id === activeImgId.currVal,
                    },
                  )}
                  alt="photos"
                  key={img}
                  onClick={() => clickOnImgHandle(id)}
                  onMouseEnter={() => onMouseEnterHandle(id)}
                  onMouseLeave={() => onMouseLeaveHandle()}
                />
              ))}
            </div>

            <div className="
              grid__item
              grid__item-3-12
              itemPage__activePhotoContainer"
            >
              <img
                className="itemPage__activePhoto"
                src={currPhoneAllSpecs.images[activeImgId.currVal]}
                alt="selected"
              />
            </div>

            <div className="grid__item grid__item-14-21 itemPage__main-specs">
              <div className="itemPage__colors">
                <p className="itemPage__colors-text">
                  Available colors
                </p>
                {colors.map(color => (
                  <div
                    className={classNames(
                      'itemPage__colors-wrapper',
                      {
                        'itemPage__colors-wrapper--active':
                          color === currColor,
                      },
                    )}
                    key={color}
                  >
                    <button
                      type="button"
                      className="itemPage__colors-btn"
                      aria-label="color"
                      style={{ backgroundColor: color }}
                      onClick={() => changeColorHandle(color)}
                    />
                  </div>
                ))}
              </div>

              <div className="itemPage__capacity">
                <p className="itemPage__capacity-text">
                  Select capacity
                </p>
                {capacity.map(value => (
                  <button
                    type="button"
                    className={classNames(
                      'itemPage__capacity-value',
                      {
                        'itemPage__capacity-value--active':
                          value === currCapacity,
                      },
                    )}
                    aria-label="color"
                    key={value}
                    onClick={() => changeCapacityHandle(value)}
                  >
                    {`${value} GB`}
                  </button>
                ))}
              </div>

              <div className="itemPage__price">
                <p className="itemPage__price-current">
                  {`$${Math.ceil(currPhone.price
                    * ((100 - currPhone.discount) / 100))}`}
                </p>
                {currPhone.discount > 0 && (
                  <p className="itemPage__price-original">
                    {`$${currPhone.price}`}
                  </p>
                )}
              </div>

              <div className="itemPage__buttons">
                <button
                  type="button"
                  className={classNames(
                    'itemPage__buttons-buy',
                    { 'itemPage__buttons-buy--selected': isWithdraw },
                  )}
                  onClick={() => buttonHandle('withdraw')}
                >
                  {isWithdraw ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  aria-label="favourite"
                  type="button"
                  className={classNames(
                    'itemPage__buttons-favourite',
                    { 'itemPage__buttons-favourite--active': isFavorite },
                  )}
                  onClick={() => buttonHandle('favorite')}
                />
              </div>

              <ul className="itemPage__specs-list">
                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Screen
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.display.screenSize}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Resolution
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.display.screenResolution}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Processor
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.hardware.cpu}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    RAM
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.storage.ram}
                  </p>
                </li>
              </ul>
            </div>

            <div className="grid__item grid__item-23-24">
              <p className="itemPage__id">
                {`ID:${currPhoneAllSpecs.id}`}
              </p>
            </div>
          </div>

          <div className="grid itemPage__section">
            <div className="grid__item grid__item-1-12 itemPage__about">
              <p className="itemPage__about-title">
                About
              </p>

              <p className="itemPage__about-text">
                {currPhoneAllSpecs.description}
              </p>
            </div>

            <div className="grid__item grid__item-14-24 itemPage__specs">
              <p className="itemPage__specs-title">
                Tech specs
              </p>

              <ul className="itemPage__specs-list">
                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Screen
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.display.screenSize}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Resolution
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.display.screenResolution}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Processor
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.hardware.cpu}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    RAM
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.storage.ram}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Built in memory
                  </p>
                  <p className="itemPage__specs-item-value">
                    {`${currCapacity} GB`}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Camera
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.camera.primary}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    Ceil
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.connectivity.cell}
                  </p>
                </li>

                <li className="itemPage__specs-item">
                  <p className="itemPage__specs-item-title">
                    OS
                  </p>
                  <p className="itemPage__specs-item-value">
                    {currPhoneAllSpecs.android.os}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="itemPage__similarPhones">
            <ItemCarousel
              title="Hot prices"
              items={similarPhones}
            />
          </div>
        </>
      )}
    </section>
  );
};
