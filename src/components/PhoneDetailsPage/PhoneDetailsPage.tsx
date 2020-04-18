import React, { FC, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import './PhoneDetailsPage.css';

import { MAIN_URL } from '../../utils/constants';
import { ButtonAddToCart } from '../ButtonAddToCart/ButtonAddToCart';
import {
  ButtonAddToFavourite,
} from '../ButtonAddToFavourite/ButtonAddToFavourite';

import {
  loadPhone as loadPhoneStore,
} from '../../store/store';

interface MatchParams {
  phoneId: string;
}

interface StateProps {
  phoneDetails: Details | null;
  phoneError: boolean;
}

interface DispatchProps {
  loadPhone: (value: string) => void;
}

type Props = RouteComponentProps<MatchParams> & StateProps & DispatchProps

const PhoneDetailsPageTemplate: FC<Props> = ({
  phoneDetails, loadPhone, match, phoneError,
}) => {
  const { phoneId } = match.params;
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    loadPhone(phoneId);
  }, [loadPhone, phoneId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chooseMainImage = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, image: string) => {
      event.preventDefault();

      setMainImage(`${MAIN_URL}${image}`);
    },
    [],
  );

  const history = useHistory();

  const loadPhoneByColor = useCallback(
    (color: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.pop();
        tmpArr.push(color);
        const newId = tmpArr.join('-');

        loadPhone(newId);
        setMainImage('');

        if (phoneDetails.id !== newId) {
          history.push(`/phones/${newId}`);
        }
      }
    },
    [loadPhone, phoneDetails, history],
  );

  const loadPhoneByCapacity = useCallback(
    (capacity: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.splice(3, 1, `${parseInt(capacity, 10)}gb`);
        const newId = tmpArr.join('-');

        loadPhone(newId);

        if (phoneDetails.id !== newId) {
          history.push(`/phones/${newId}`);
        }
      }
    },
    [loadPhone, phoneDetails, history],
  );

  if (phoneError || !phoneDetails) {
    return (
      <>
        <div className="phones__not-phound">Phone not found</div>
      </>
    );
  }

  return (
    <div className="phone__container">
      <div className="phones__path">
        <img src="./img/Home.png" alt="home_icon" className="home-icon" />
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">Phones</span>
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">{phoneDetails.name}</span>
      </div>
      <h2 className="phones__heding">{phoneDetails.name}</h2>
      <div className="phone__container-main">
        <div className="phone__images">
          <ul className="phone__images--list">
            {phoneDetails.images.map(image => (
              <li key={image} className="phone__images-item">
                <a
                  href="/"
                  className="phone__images-link"
                  onClick={(event) => chooseMainImage(event, image)}
                >
                  <img
                    src={`${MAIN_URL}${image}`}
                    alt="phone_small_img"
                    className="phone__images-img"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="phone__images--big">
            <img
              src={mainImage || `${MAIN_URL}${phoneDetails.images[0]}`}
              alt="phone_big_img"
              className="phone__images--big-img"
            />
          </div>
        </div>
        <div className="phone__main-info">
          <div className="phone__colors">
            <p className="main-info__title">Available colors</p>
            <div className="colors__color-list">
              {phoneDetails.colorsAvailable.map((color) => (
                <div
                  key={color}
                  className={color === phoneDetails.color
                    ? 'colors__color-active colors__color'
                    : 'colors__color'}
                >
                  <button
                    type="button"
                    style={{ backgroundColor: color }}
                    className="colors__color-item"
                    onClick={() => loadPhoneByColor(color)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="phone__capacity">
            <p className="main-info__title">Select capacity</p>
            <div className="capacity__capacity-list">
              {phoneDetails.capacityAvailable.map((capacity) => (
                <button
                  type="button"
                  key={capacity}
                  className={capacity === phoneDetails.capacity
                    ? 'capacity__capacity-active capacity__item'
                    : 'capacity__item'}
                  onClick={() => loadPhoneByCapacity(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="card__price price-discount">
              {`$${phoneDetails.priceDiscount}`}
            </span>
            <span className="card__price price-regular">
              {`$${phoneDetails.priceRegular}`}
            </span>
          </div>
          <div className="card__actions-details">
            <ButtonAddToCart
              id={phoneDetails.id}
              price={phoneDetails.priceDiscount}
            />
            <ButtonAddToFavourite
              id={phoneDetails.id}
            />
          </div>
          <div className="card__details-main">
            <div className="card__detail">
              <span className="card__detail-name">Screen</span>
              <span className="card__detail-value">
                {phoneDetails.screen}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Resolution</span>
              <span className="card__detail-value">
                {phoneDetails.resolution}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Processor</span>
              <span className="card__detail-value">
                {phoneDetails.processor}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Ram</span>
              <span className="card__detail-value">
                {`${phoneDetails.ram
                  ? parseInt(phoneDetails.ram, 10)
                  : ''} ${phoneDetails.ram.slice(-2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="phone__container-specification">
        <div className="phone__about">
          <h3 className="specification__heading">
            About
          </h3>
          <div className="specification__info">
            {phoneDetails.description.map(info => (
              <div key={info.title} className="specification__info-item">
                <h4 className="specification__info-heading">
                  {info.title}
                </h4>
                {info.text.map(text => (
                  <div key={text} className="specification__info-text">
                    {text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="phone__description">
          <h3 className="specification__heading">
            Tech specs
          </h3>
          <div className="card__details-description">
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Screen
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.screen}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Resolution
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.resolution}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Processor
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.processor}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">Ram</span>
              <span className="card__detail-value specification__value">
                {`${phoneDetails.ram
                  ? parseInt(phoneDetails.ram, 10)
                  : ''} ${phoneDetails.ram.slice(-2)}`}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Capacity
              </span>
              <span className="card__detail-value specification__value">
                {`${phoneDetails.capacity
                  ? parseInt(phoneDetails.capacity, 10)
                  : ''
                } ${phoneDetails.capacity.slice(-2)}`}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Camera
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.camera}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Zoom
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.zoom}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Cell
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phoneDetails: state.phoneDetails,
  phoneError: state.phoneError,
});

const mapDispatchToProps = {
  loadPhone: loadPhoneStore,
};

export const PhoneDetailsPage = connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(PhoneDetailsPageTemplate);
