import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './PageItem.scss';
import { useAppSelector } from '../../app/hooks';
import { useContext, useState } from 'react';
import classNames from 'classnames';
// import { findProduct } from '../../utils/searchHelper';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';

const allColors = {
  gold: '#FCDBC1',
  spaceblack: '#4C4C4C',
  graphite: '#5F7170',
  sierrablue: '#5F7170',
};

export const PageItem = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { lang } = useContext(LangContext);
  const { id } = useParams();
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);
  const item =
    phones.find(product => product.id === id) ||
    tablets.find(product => product.id === id) ||
    accessories.find(product => product.id === id);

  const lastIndexDash = id?.lastIndexOf('-');
  const linkWithoutColor = id?.slice(0, lastIndexDash);
  const preLastIndexDash = linkWithoutColor?.lastIndexOf('-');
  const linkWithoutCapacity = id?.slice(0, preLastIndexDash);

  // console.log(linkWithoutCapacity);

  return (
    <div className="page-item">
      <div className="page-item__container">
        <Navigation />
        <div className="page-item__back">
          <div className="page-item__back--arrow icon icon--arrow-left"></div>
          <div className="page-item__back--text">back</div>
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
              <p>Available colors</p>
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
              <span>ID: 123231</span>
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
        </div>
      </div>
    </div>
  );
};
