import styles from './PageItem.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { favoriteSlice } from '../../features/favoriteSlice';
import { cartSlice } from '../../features/cartSlice';
import { Back } from '../Back';

const allColors = {
  gold: '#FCDBC1',
  spaceblack: '#4C4C4C',
  spacegray: '#86807d',
  graphite: '#5F7170',
  sierrablue: '#96adc5',
  rosegold: '#f6cfc8',
  midnightgreen: '#5d675f',
  midnight: '#191f28',
  green: '#abdfc9',
  black: '#191c1b',
  purple: '#ccc7d7',
  red: '#b20126',
  white: '#fefdf9',
  yellow: '#fde580',
  silver: '#efeee7',
  blue: '#215e7e',
  skyblue: '#215e7e',
  pink: '#fd9bd5',
  coral: '#fd6351',
  starlight: '#d7cec1',
};

export const PageItem = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { lang } = useContext(LangContext);
  const { id } = useParams();
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);
  const { favoriteGoods } = useAppSelector(state => state.favorites);
  const { cartGoods } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const item =
    phones.find(product => product.id === id) ||
    tablets.find(product => product.id === id) ||
    accessories.find(product => product.id === id);

  const lastIndexDash = id?.lastIndexOf('-');
  const linkWithoutColor = id?.slice(0, lastIndexDash);
  const preLastIndexDash = linkWithoutColor?.lastIndexOf('-');
  const linkWithoutCapacity = id?.slice(0, preLastIndexDash);

  const randomId = Math.floor(100000 + Math.random() * 900000);
  const isItemInCart = cartGoods.some(good => good.id === item?.id);

  return (
    <div className={styles.pageItem}>
      <div className={styles.pageItem__container}>
        <Navigation />
        <Back />
        <h1 className={styles.pageItem__title}>{item?.name}</h1>
        <div className={styles.pageItem__gridContainer}>
          <div className={styles.pageItem__boxImg}>
            <img
              src={`${item?.images[currentImage]}`}
              alt={`Big photo ${item?.images[currentImage]}`}
              className={styles.pageItem__img__big}
            />
          </div>
          <div className={styles.pageItem__images}>
            {item?.images.map((image, index) => (
              <div
                className={classNames(styles.pageItem__img, {
                  [styles.active]: index === currentImage,
                })}
                key={image}
                onClick={() => setCurrentImage(index)}
              >
                <img src={`${image}`} alt={`photo ${image}`} />
              </div>
            ))}
          </div>
          <div className={styles.pageItem__controls}>
            <div className={styles.pageItem__controls__colors}>
              <p className={styles.pageItem__controls__title}>
                {translate('item.colors', lang)}
              </p>
              <div className={styles.pageItem__controls__colors__box}>
                {(item?.colorsAvailable as (keyof typeof allColors)[]).map(
                  color => (
                    <Link
                      to={`/${item?.category}/${linkWithoutColor}-${color}`}
                      className={classNames(styles.pageItem__controls__color, {
                        [styles.active]: id?.includes(color),
                      })}
                      key={color}
                      style={{ backgroundColor: allColors[color] }}
                      onClick={() => window.scrollTo(0, 0)}
                    ></Link>
                  ),
                )}
              </div>
              <span className={styles.pageItem__controls__id}>
                ID: {randomId}
              </span>
              <div className={styles.pageItem__controls__separator}></div>
              <div className={styles.pageItem__controls__capacity__container}>
                <p>{translate('item.cap', lang)}</p>
                <div className={styles.pageItem__controls__capacity__box}>
                  {item?.capacityAvailable.map(cap => (
                    <Link
                      to={`/${item?.category}/${linkWithoutCapacity}-${cap.toLowerCase()}${id?.slice(lastIndexDash, id.length)}`}
                      className={classNames(
                        styles.pageItem__controls__capacity__button,
                        { [styles.active]: id?.includes(cap.toLowerCase()) },
                      )}
                      key={cap}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {cap}
                    </Link>
                  ))}
                </div>
                <div className={styles.pageItem__controls__separator}></div>
                <div className={styles.pageItem__prices}>
                  <div
                    className={styles.pageItem__price}
                  >{`$${item?.priceDiscount}`}</div>
                  {
                    <div
                      className={styles.pageItem__price__discount}
                    >{`$${item?.priceRegular}`}</div>
                  }
                </div>
                <div className={styles.pageItem__buttons}>
                  <button
                    className={classNames(styles.pageItem__button__add, {
                      [styles.inCart]: isItemInCart,
                    })}
                    onClick={() => {
                      if (isItemInCart) {
                        dispatch(
                          cartSlice.actions.removeGood({
                            ...item!,
                            quantity: 1,
                          }),
                        );
                      } else {
                        dispatch(
                          cartSlice.actions.addGood({ ...item!, quantity: 1 }),
                        );
                      }
                    }}
                  >
                    {translate('card.button', lang)}
                  </button>
                  <button
                    className={classNames(
                      styles.pageItem__button,
                      stylesIcon.icon,
                      stylesIcon.icon__heart,
                      stylesBtn.button,
                      {
                        [stylesIcon.isFavorite]: favoriteGoods.some(
                          good => good.id === item?.id,
                        ),
                      },
                    )}
                    onClick={() => {
                      if (item) {
                        if (favoriteGoods.some(good => good.id === item.id)) {
                          dispatch(favoriteSlice.actions.removeGood(item));
                        } else {
                          dispatch(favoriteSlice.actions.addGood(item));
                        }
                      }
                    }}
                  ></button>
                </div>
                <ul className={styles.pageItem__list}>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>
                      {translate('card.screen', lang)}
                    </p>
                    <p className={styles.pageItem__list__value}>
                      {item?.screen.slice(0, 9)}
                    </p>
                  </li>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>
                      {translate('card.resolution', lang)}
                    </p>
                    <p className={styles.pageItem__list__value}>
                      {item?.resolution}
                    </p>
                  </li>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>
                      {translate('card.processor', lang)}
                    </p>
                    <p className={styles.pageItem__list__value}>
                      {item?.processor}
                    </p>
                  </li>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>RAM</p>
                    <p className={styles.pageItem__list__value}>{item?.ram}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.pageItem__about}>
            <h3 className={styles.pageItem__about__title}>About</h3>
            <div className={styles.pageItem__controls__separator}></div>
            {item?.description.map(desc => (
              <React.Fragment key={desc.title}>
                <h4 className={styles.pageItem__desc__title}>{desc.title}</h4>
                <p className={styles.pageItem__desc__text}>{desc.text}</p>
              </React.Fragment>
            ))}
          </div>
          <div className={styles.pageItem__spec}>
            <h3 className={styles.pageItem__spec__title}>Tech specs</h3>
            <div className={styles.pageItem__controls__separator}></div>
            <ul className={styles.pageItem__list}>
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>
                  {translate('card.screen', lang)}
                </p>
                <p className={styles.pageItem__list__value}>
                  {item?.screen.slice(0, 9)}
                </p>
              </li>
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>
                  {translate('card.resolution', lang)}
                </p>
                <p className={styles.pageItem__list__value}>
                  {item?.resolution}
                </p>
              </li>
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>
                  {translate('card.processor', lang)}
                </p>
                <p className={styles.pageItem__list__value}>
                  {item?.processor}
                </p>
              </li>
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>RAM</p>
                <p className={styles.pageItem__list__value}>{item?.ram}</p>
              </li>
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>
                  {translate('card.memory', lang)}
                </p>
                <p className={styles.pageItem__list__value}>{item?.capacity}</p>
              </li>
              {item?.category !== 'accessories' && (
                <>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>Camera</p>
                    <p className={styles.pageItem__list__value}>
                      {item?.camera}
                    </p>
                  </li>
                  <li className={styles.pageItem__list__item}>
                    <p className={styles.pageItem__list__name}>Zoom</p>
                    <p className={styles.pageItem__list__value}>{item?.zoom}</p>
                  </li>
                </>
              )}
              <li className={styles.pageItem__list__item}>
                <p className={styles.pageItem__list__name}>Cell</p>
                <p className={styles.pageItem__list__value}>
                  {item?.cell.join(', ')}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
