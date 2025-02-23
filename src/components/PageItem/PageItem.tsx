import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './PageItem.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { navigationSlice } from '../../features/navigationSlice';

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

  return (
    <div className="page-item">
      <div className="page-item__container">
        <Navigation />
        <div className="page-item__back">
          <div className="page-item__back--arrow icon icon--arrow-left"></div>
          <Link
            to={`/${item?.category}`}
            className="page-item__back--text"
            onClick={() => {
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink(`${item?.category}`));
            }}
          >
            Back
          </Link>
        </div>
        <h1 className="page-item__title">{item?.name}</h1>
        <div className="page-item__grid-container">
          <div className="page-item__box-img">
            <img
              src={`${item?.images[currentImage]}`}
              alt={`Big photo ${item?.images[currentImage]}`}
              className="page-item__img--big"
            />
          </div>
          <div className="page-item__images">
            {item?.images.map((image, index) => (
              <div
                className={classNames('page-item__img', {
                  active: index === currentImage,
                })}
                key={image}
                onClick={() => setCurrentImage(index)}
              >
                <img src={`${image}`} alt={`photo ${image}`} />
              </div>
            ))}
          </div>
          <div className="page-item__controls">
            <div className="page-item__controls__colors">
              <p className="page-item__controls__title">Available colors</p>
              <div className="page-item__controls__colors__box">
                {(item?.colorsAvailable as (keyof typeof allColors)[]).map(
                  color => (
                    <Link
                      to={`/${item?.category}/${linkWithoutColor}-${color}`}
                      className={classNames('page-item__controls__color', {
                        active: id?.includes(color),
                      })}
                      key={color}
                      style={{ backgroundColor: allColors[color] }}
                    ></Link>
                  ),
                )}
              </div>
              <span className="page-item__controls__id">ID: {randomId}</span>
              <div className="page-item__controls__separator"></div>
              <div className="page-item__controls__capacity__container">
                <p>Select capacity</p>
                <div className="page-item__controls__capacity__box">
                  {item?.capacityAvailable.map(cap => (
                    <Link
                      to={`/${item?.category}/${linkWithoutCapacity}-${cap.toLowerCase()}${id?.slice(lastIndexDash, id.length)}`}
                      className={classNames(
                        'page-item__controls__capacity__button',
                        { active: id?.includes(cap.toLowerCase()) },
                      )}
                      key={cap}
                    >
                      {cap}
                    </Link>
                  ))}
                </div>
                <div className="page-item__controls__separator"></div>
                <div className="card__prices page-item__prices">
                  <div className="card__price">{`$${item?.priceDiscount}`}</div>
                  {
                    <div className="card__price--discount">{`$${item?.priceRegular}`}</div>
                  }
                </div>
                <div className="card__buttons page-item__buttons">
                  <button className="card__button--add">
                    {translate('card.button', lang)}
                  </button>
                  {/* eslint-disable-next-line max-len*/}
                  <button className="card__button icon icon--heart button"></button>
                </div>
                <ul className="card__list">
                  <li className="card__list--item">
                    <p className="card__list--name small-text">
                      {translate('card.screen', lang)}
                    </p>
                    <p className="card__list--value">
                      {item?.screen.slice(0, 9)}
                    </p>
                  </li>
                  <li className="card__list--item">
                    <p className="card__list--name small-text">
                      {translate('card.resolution', lang)}
                    </p>
                    <p className="card__list--value">{item?.resolution}</p>
                  </li>
                  <li className="card__list--item">
                    <p className="card__list--name small-text">
                      {translate('card.processor', lang)}
                    </p>
                    <p className="card__list--value">{item?.processor}</p>
                  </li>
                  <li className="card__list--item">
                    <p className="card__list--name small-text">RAM</p>
                    <p className="card__list--value">{item?.ram}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="page-item__about">
            <h3 className="page-item__about__title">About</h3>
            <div className="page-item__controls__separator"></div>
            {item?.description.map(desc => (
              <React.Fragment key={desc.title}>
                <h4 className="page-item__desc__title">{desc.title}</h4>
                <p className="page-item__desc__text">{desc.text}</p>
              </React.Fragment>
            ))}
          </div>
          <div className="page-item__spec">
            <h3 className="page-item__spec__title">Tech specs</h3>
            <div className="page-item__controls__separator"></div>
            <ul className="card__list">
              <li className="card__list--item">
                <p className="card__list--name small-text">
                  {translate('card.screen', lang)}
                </p>
                <p className="card__list--value">{item?.screen.slice(0, 9)}</p>
              </li>
              <li className="card__list--item">
                <p className="card__list--name small-text">
                  {translate('card.resolution', lang)}
                </p>
                <p className="card__list--value">{item?.resolution}</p>
              </li>
              <li className="card__list--item">
                <p className="card__list--name small-text">
                  {translate('card.processor', lang)}
                </p>
                <p className="card__list--value">{item?.processor}</p>
              </li>
              <li className="card__list--item">
                <p className="card__list--name small-text">RAM</p>
                <p className="card__list--value">{item?.ram}</p>
              </li>
              <li className="card__list--item">
                <p className="card__list--name small-text">
                  {translate('card.memory', lang)}
                </p>
                <p className="card__list--value">{item?.capacity}</p>
              </li>
              {item?.category !== 'accessories' && (
                <>
                  <li className="card__list--item">
                    <p className="card__list--name small-text">Camera</p>
                    <p className="card__list--value">{item?.camera}</p>
                  </li>
                  <li className="card__list--item">
                    <p className="card__list--name small-text">Zoom</p>
                    <p className="card__list--value">{item?.zoom}</p>
                  </li>
                </>
              )}
              <li className="card__list--item">
                <p className="card__list--name small-text">Cell</p>
                <p className="card__list--value">{item?.cell.join(', ')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
