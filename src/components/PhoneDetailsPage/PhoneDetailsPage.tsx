import React, { FC, useMemo, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  loadPhone as loadPhoneStore,
} from '../../store/store';

import './PhoneDetailsPage.css';
import { MAIN_URL } from '../../utils/constants';

interface MatchParams {
  phoneId: string;
}

interface StateProps {
  phoneDetails: Details | null;
  phoneError: string;
}

interface DispatchProps {
  loadPhone: (value: string) => void;
}

const PhoneDetailsPageTemplate: FC<
  RouteComponentProps<MatchParams> & StateProps & DispatchProps
> = ({
  phoneDetails,
  loadPhone,
  match,
  phoneError,
}) => {
  const [mainImage, setMainImage] = useState('');

  useMemo(() => loadPhone(match.params.phoneId), []);

  const chooseMainImage = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, image: string) => {
      event.preventDefault();

      setMainImage(`${MAIN_URL}${image}`);
    },
    [mainImage],
  );

  const loadPhoneByColor = useCallback(
    (color: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.pop();
        tmpArr.push(color);
        const newId = tmpArr.join('-');

        loadPhone(newId);
      }
    },
    [phoneDetails],
  );

  const loadPhoneByCapacity = useCallback(
    (capacity: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.splice(3, 1, `${parseInt(capacity, 10)}gb`);
        const newId = tmpArr.join('-');

        loadPhone(newId);
      }
    },
    [phoneDetails],
  );

  if (phoneError || !phoneDetails) {
    return (
      <>
        <div>Phone not found</div>
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

export const PhoneDetailsPage = connect(
  mapStateToProps, mapDispatchToProps,
)(PhoneDetailsPageTemplate);
