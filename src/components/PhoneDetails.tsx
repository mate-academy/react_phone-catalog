import React, { useEffect, FC, useState, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { NotFoundProne } from './NotFoundPhone';
import * as actions from '../redux/actions';
import { LoaderComponent } from './LoaderComponent';

interface Props {
  id: string;
  phone: Details|null;
  error: string|null;
  basket: Basket[];
  isLoading: boolean;
  isLoaded: boolean;
  loadPhoneDetails: (id: string) => void;
  setBasket: (basket: Basket[]) => void;
}

const PhoneDetailsTemplate: FC<Props> = ({
  id,
  phone,
  error,
  basket,
  isLoaded,
  isLoading,
  loadPhoneDetails,
  setBasket,
}) => {
  const [currentImg, setCurrentImg] = useState<string|undefined>(undefined);

  useEffect(() => {
    loadPhoneDetails(id);
  }, []);

  useEffect(() => {
    loadPhoneDetails(id);
  }, [id]);

  useEffect(() => {
    setCurrentImg(phone?.images[0]);
  }, [phone]);

  const handlePhotoClick = (photo: string): void => {
    setCurrentImg(photo);
  };

  const handleAdd = (e: MouseEvent<HTMLButtonElement>, phoneId: string) => {
    e.preventDefault();

    setBasket([...basket, {
      id: phoneId, quantity: 1, phone: `/phones/${id}`,
    }]);
  };

  if (isLoading && !isLoaded) {
    return <LoaderComponent />;
  }

  if (!error && phone && isLoaded) {
    return (
      <section className="details">
        <div className="info">
          <div className="info__slider">
            <img
              src={currentImg}
              alt="phone_img"
              className="info__slider-img"
            />
          </div>
          <div className="info__base">
            <h3 className="info__header">{phone.id}</h3>
            <p className="info__description">{phone.description}</p>
            {basket.find(item => item.id === id)
              ? (
                <button
                  className="phone__added"
                  type="button"
                  disabled
                >
              Added to cart
                </button>
              )
              : (
                <button
                  className="phone__add"
                  type="button"
                  onClick={(e) => handleAdd(e, id)}
                >
              Add to cart
                </button>
              )}
            <ul className="info__list">
              {phone.images.map(photo => (
                <li key={photo} className="info__item">
                  <button
                    type="button"
                    className="info__button"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img
                      src={photo}
                      alt="device"
                      className="info__item-img"
                    />
                  </button>

                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="details__wrapper">
          <div className="details__about">
            <h3>About</h3>
            <ul>
              <li>
                <p className="details__naming">Availability and Networks</p>
                <p className="details__naming-description">
                  {phone.availability}
                </p>
              </li>
              <li>
                <p className="details__naming">Additional features</p>
                <p className="details__naming-description">
                  {phone.additionalFeatures}
                </p>
              </li>
              <li>
                <p className="details__naming">Camera</p>
                <p className="details__naming-description">
                  {phone.camera.primary}
                </p>
              </li>
            </ul>
          </div>

          <div className="details__tech">
            <h3>Tech specs</h3>
            <ul>
              <li>
                <p className="details__naming">Screen size</p>
                <p className="details__naming-description">
                  {phone.display.screenSize}
                </p>
              </li>
              <li>
                <p className="details__naming">Screen resolution</p>
                <p className="details__naming-description">
                  {phone.display.screenResolution}
                </p>
              </li>
              <li>
                <p className="details__naming">TouchScreen</p>
                <p className="details__naming-description">
                  {phone.display.touchScreen ? 'yes' : 'no'}
                </p>
              </li>
              <li>
                <p className="details__naming">Storage and Memory</p>
                <p className="details__naming-description">
                  {phone.storage.flash}
                </p>
              </li>
              <li>
                <p className="details__naming">RAM</p>
                <p className="details__naming-description">
                  {phone.storage.ram}
                </p>
              </li>
              <li>
                <p className="details__naming">Network support</p>
                <p className="details__naming-description">
                  {phone.connectivity.cell}
                </p>
              </li>
              <li>
                <p className="details__naming">WI-FI</p>
                <p className="details__naming-description">
                  {phone.connectivity.wifi}
                </p>
              </li>
              <li>
                <p className="details__naming">Bluetooth</p>
                <p className="details__naming-description">
                  {phone.connectivity.bluetooth}
                </p>
              </li>
              <li>
                <p className="details__naming">Infrared</p>
                <p className="details__naming-description">
                  {phone.connectivity.infrared ? 'yes' : 'no'}
                </p>
              </li>
              <li>
                <p className="details__naming">GPS</p>
                <p className="details__naming-description">
                  {phone.connectivity.gps ? 'yes' : 'no'}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return <NotFoundProne />;
};

const mapStateToProps = (
  state: {
    phoneDetailsReducer: PhoneDetailsState;
    errorReducer: ErrorState;
    basketReducer: BasketState;
    loadReducer: LoadState;
  },
) => ({
  phone: state.phoneDetailsReducer.phone,
  error: state.errorReducer.error,
  basket: state.basketReducer.basket,
  isLoaded: state.loadReducer.isLoaded,
  isLoading: state.loadReducer.isLoading,
});

const mapDispatchToProps = {
  loadPhoneDetails: actions.loadPhoneDetails,
  setBasket: actions.setBasket,
};

export const PhoneDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneDetailsTemplate);
