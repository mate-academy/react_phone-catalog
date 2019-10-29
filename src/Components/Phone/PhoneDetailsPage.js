import React from 'react';
import PropTypes from 'prop-types';

// get Api from server

import { getDetails } from './getAPIDoc';
// Components
import Loading from './Loading';

import './scss/PhoneDetailsPage.scss';

class PhoneDetailsPage extends React.Component {
  static defaultProps = {
    urlImg: PropTypes.string,
    phoneId: PropTypes.string,
  }

  state = {
    phoneDetails: null,
    imgChoseUrl: '',
  }

  async componentDidMount() {
    const phoneDetails = await getDetails(this.props.phoneId);

    this.setState({ phoneDetails });
  }

  handleChose = (imgUrl) => {
    this.setState({ imgChoseUrl: imgUrl });
  }

  render() {
    const { phoneDetails, imgChoseUrl } = this.state;
    const {
      urlImg, phoneId, phones, setItemToBasket,
    } = this.props;
    const isPhoneId = phones.find(phone => phone.id === phoneId);

    if (!isPhoneId) {
      return (
        <div className="wrraper__was__not_phone">
          <h1 className="phone__was__not">Phone Was Not Found</h1>
        </div>
      );
    }

    return (
      phoneDetails === null ? <Loading />
        : (
          <div
            className="catalog__phones"
          >
            <div className="catalog__phones__main">
              <div className="catalog__phones__details__wrap">
                <div className="catalog__phones__details__img_wraper">
                  <div className="catalog__phones__phone__details-main">
                    <div className="catalog__phones__container__for__images">
                      <div className="catalog__phones__details__img_wrap">
                        <img
                          src={`${urlImg}/${imgChoseUrl}`}
                          alt={`${imgChoseUrl}`}
                        />
                      </div>

                      {phoneDetails.images.map(imgUrl => (
                        <div className="catalog__phones__details__img_wrap">
                          <img
                            onMouseOver={() => this.handleChose(`${imgUrl}`)}
                            key={imgUrl}
                            src={`${urlImg}/${imgUrl}`}
                            alt="phone"
                            className="card__img"
                            onFocus
                          />
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
                <div className="catalog__phones__details__information">
                  <h1>{`${phoneDetails.id}`}</h1>
                  <div className="catalog__phones__details">
                    <h1>description</h1>
                    <p>{`${phoneDetails.description}`}</p>
                  </div>
                  <div className="catalog__phones__details__add__button">
                    <button
                      type="submit"
                      onClick={() => {
                        setItemToBasket(
                          phoneDetails.name,
                          urlImg,
                          phoneDetails.id
                        );
                      }}
                    >
                    Add to basket
                    </button>
                  </div>
                </div>
              </div>
              <div className="catalog__phones__phone_details__text_details">

                <div className="catalog__phones__android__wrapper">
                  <h3>Display</h3>
                  <p>
                  screenResolution:
                    <br />
                    {`${phoneDetails.display.screenResolution}`}
                  </p>
                  <p>
                  screenSize:
                    <br />
                    {`${phoneDetails.display.screenSize}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>android</h3>
                  <p>
                  os:
                    <br />
                    {`${phoneDetails.android.os}`}
                  </p>
                  <p>
                  ui:
                    <br />
                    {`${phoneDetails.android.ui}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>hardware</h3>
                  <p>
                  audioJack:
                    <br />
                    {`${phoneDetails.hardware.audioJack}`}
                  </p>
                  <p>
                  cpu:
                    <br />
                    {`${phoneDetails.hardware.cpu}`}
                  </p>
                  <p>
                  usb:
                    <br />
                    {`${phoneDetails.hardware.usb}`}
                  </p>
                </div>

                <div className="catalog__phones__android__wrapper">
                  <h3>battery</h3>
                  <p>
                    talkTime:
                    <br />
                    {`${phoneDetails.battery.talkTime}`}
                  </p>
                  <p>
                    standbyTime:
                    <br />
                    {`${phoneDetails.battery.standbyTime}`}
                  </p>
                  <p>
                    Type:
                    <br />
                    {`${phoneDetails.battery.type}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>Storage and Memory</h3>
                  <p>
                  Internal Storage:
                    <br />
                    {`${phoneDetails.storage.flash}`}
                  </p>
                  <p>
                  RAM:
                    <br />
                    {`${phoneDetails.storage.ram}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>
                    Connectivity
                    <br />
                    Network Support
                  </h3>
                  <p>
                  WiFi:
                    <br />
                    {`${phoneDetails.connectivity.wifi}`}
                  </p>
                  <p>
                  Bluetooth:
                    <br />
                    {`${phoneDetails.connectivity.bluetooth}`}
                  </p>
                  <p>
                  Infrared:
                    <br />
                    <input
                      type="checkbox"
                      checked={phoneDetails.connectivity.infrared}
                    />
                  </p>
                  <p>
                  GPS:
                    <br />
                    <input
                      type="checkbox"
                      checked={phoneDetails.connectivity.gps}
                    />
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>Size and Weight</h3>
                  <p>
                  Dimensions:
                    <br />
                    {`${phoneDetails.sizeAndWeight.dimensions.map(a => a)}`}
                  </p>
                  <p>
                  Weight:
                    <br />
                    {`${phoneDetails.sizeAndWeight.weight}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>Additional Features</h3>
                  <p>
                    {`${phoneDetails.additionalFeatures}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>Camera</h3>
                  <p>
                  Primary:
                    <br />
                    {`${phoneDetails.camera.primary}`}
                  </p>
                  <p>
                  Features:
                    <br />
                    {`${phoneDetails.camera.features}`}
                  </p>
                </div>
                <div className="catalog__phones__android__wrapper">
                  <h3>Hardware</h3>
                  <p>
                  CPU:
                    <br />
                    {`${phoneDetails.hardware.cpu}`}
                  </p>
                  <p>
                  USB:
                    <br />
                    {`${phoneDetails.hardware.usb}`}
                  </p>
                  <p>
                  Audio / headphone jack:
                    <br />
                    {`${phoneDetails.hardware.audioJack}`}
                  </p>
                  <p>
                  FM Radio:
                    <br />
                    <input
                      type="checkbox"
                      checked={phoneDetails.hardware.fmRadio}
                    />
                  </p>
                  <p>
                  Accelerometer:
                    <br />
                    <input
                      type="checkbox"
                      checked={phoneDetails.hardware.accelerometer}
                    />
                  </p>
                </div>

              </div>

            </div>
          </div>
        ));
  }
}

PhoneDetailsPage.defaultProps = {

};

PhoneDetailsPage.propTypes = {
  urlImg: PropTypes.string,
  phoneId: PropTypes.string,
  phones: PropTypes.shape().isRequired,
  setItemToBasket: PropTypes.func.isRequired,
};

export default PhoneDetailsPage;
