import React from 'react'
import { BASE_URL } from '../../lib/constants'
import PropTypes from 'prop-types';
import CheckMark from '../../components/CheckMark';

class Phone extends React.Component {
  state = {
    currentImg: '',
  }

  componentDidMount = () => {
    const { detailsOfCurrentPhone } = this.props;

    const currentImage = `${BASE_URL}/${detailsOfCurrentPhone.images[0]}`;

    this.setState({
      currentImg: currentImage,
    })
  }

  chooseCurrentImg = event => {
    const { src } = event.target;

    this.setState({
      currentImg: src,
    })
  };

  render() {
    const {
      id,
      phone,
      detailsOfCurrentPhone,
      itemsInBasket,
      addItemToBasket,
    } = this.props;
    const { currentImg } = this.state;

    return (
      <>
        <div className="phone-page__top-container">
          <div className="phone-page__photos-container">
            <div className="phone-page__photos-container-for-non-fall">
              <img
                className="phone-page__main-photo"
                src={currentImg}
                alt="phone_photo"
              />
            </div>
            <div>
              {
                detailsOfCurrentPhone.images.map(image =>
                  <input
                    className="phone-page__additional-photo"
                    key={`${BASE_URL}/${image}`}
                    type="image"
                    onClick={this.chooseCurrentImg}
                    src={`${BASE_URL}/${image}`}
                    alt="additional photo for phone"
                  />
                )
              }
            </div>
          </div>

          <div className="phone-page__name-and-description-container">
            <h1 className="phone-page__heading">
              {detailsOfCurrentPhone.name}
            </h1>
            <div className="phone-page__general-description">
              {detailsOfCurrentPhone.description}
            </div>
            <button
              className={
                itemsInBasket.find(item => item.id === id)
                  ? "button button--add-in-basket button--add-in-basket_added button--add-in-basket_page-details"
                  : "button button--add-in-basket button--add-in-basket_page-details"
              }
              onClick={() => addItemToBasket(phone)}
            >
              {itemsInBasket.find(item => item.id === id)
                ? "Added to basket"
                : "Add to basket"}
            </button>
          </div>
        </div>

        <div className="phone-page__details-container">
          <h3 className="phone-page__details-heading">Phone details</h3>
          <ul className="phone-page__details-list">
            <li className="phone-page__details-column" key={"android"}>
              <h4>Android:</h4>
              <dl>
                <dt>OS:</dt>
                <dd>{detailsOfCurrentPhone.android.os}</dd>
                <dt>UI:</dt>
                <dd>{detailsOfCurrentPhone.android.ui}</dd>
              </dl>
            </li>
            <li className="phone-page__details-column" key={"battery"}>
              <h4>Battery</h4>
              <dl>
                <dt>Stand by time:</dt>
                <dd>{detailsOfCurrentPhone.battery.standbyTime}</dd>
                <dt>Talk time:</dt>
                <dd>{detailsOfCurrentPhone.battery.talkTime}</dd>
                <dt>Type:</dt>
                <dd>{detailsOfCurrentPhone.battery.type}</dd>
              </dl>
            </li>
            <li className="phone-page__details-column" key={"camera"}>
              <h4>Camera: </h4>
              <dl>
                <dt>Screen Resolution:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.camera.features]}
                  />
                </dd>
                <dt>Primary:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.camera.primary]}
                  />
                </dd>
              </dl>
            </li>

            <li className="phone-page__details-column" key="connectivity">
              <h4>Connectivity:</h4>

              <dl>
                <dt>Bluetooth:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.bluetooth}</dd>

                <dt>Cell:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.cell}</dd>

                <dt>Gps:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.connectivity.gps]}
                  />
                </dd>

                <dt>Infrared:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.connectivity.infrared]}
                  />
                </dd>

                <dt>Wifi:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.wifi}</dd>
              </dl>
            </li>

            <li className="phone-page__details-column" key="display">
              <h4>Display:</h4>

              <dl>
                <dt>Screen Resolution:</dt>
                <dd>{detailsOfCurrentPhone.display.screenResolution}</dd>

                <dt>Sreen Size:</dt>
                <dd>{detailsOfCurrentPhone.display.screenSize}</dd>

                <dt>TouchScreen:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.display.touchScreen]}
                  />
                </dd>
              </dl>
            </li>

            <li className="phone-page__details-column" key="hardware">
              <h4>Hardware:</h4>

              <dl>
                <dt>Accelerometer:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.display.touchScreen]}
                  />
                </dd>

                <dt>AudioJack:</dt>
                <dd>{detailsOfCurrentPhone.hardware.audioJack}</dd>

                <dt>CPU:</dt>
                <dd>{detailsOfCurrentPhone.hardware.cpu}</dd>

                <dt>Fm Radio:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.hardware.fmRadio]}
                  />
                </dd>

                <dt>Physical Keyboard:</dt>
                <dd>
                  <CheckMark
                    {...[detailsOfCurrentPhone.hardware.physicalKeyboard]}
                  />
                </dd>

                <dt>USB:</dt>
                <dd>{detailsOfCurrentPhone.hardware.usb}</dd>
              </dl>
            </li>

            <li className="phone-page__details-column" key="sizeAndWeight">
              <h4>Size And Weight:</h4>

              <dl>
                <dt>Dimensions:</dt>
                <dd>{detailsOfCurrentPhone.sizeAndWeight.dimensions}</dd>

                <dt>Weight:</dt>
                <dd>{detailsOfCurrentPhone.sizeAndWeight.dimensions}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

Phone.propTypes = {
  detailsOfCurrentPhone: PropTypes.shape({
    additionalFeatures: PropTypes.string,
    android: PropTypes.object,
    battery: PropTypes.object,
    camera: PropTypes.object,
    connectivity: PropTypes.object,
    display: PropTypes.object,
    hardware: PropTypes.object,
    images: PropTypes.array,
    sizeAndWeight: PropTypes.object,
  }),
  addItemToBasket: PropTypes.func.isRequired,
  itemsInBasket: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default Phone
