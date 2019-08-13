import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles/phoneDetails.css';

class PhoneDetails extends React.Component {
  state = {
    selectedImg: '',
    showDetails: false,
  };

  componentDidMount() {
    const { images } = this.props.phoneDetails;
    this.setState({
      selectedImg: images[0],
    });
  }

  handlerShowDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  handlerSelectImg = (event) => {
    const { src } = event.target;

    this.setState({
      selectedImg: src,
    });
  };

  render() {
    const { selectedImg, showDetails } = this.state;
    const { handlerAddToBasket } = this.state;
    const {
      name,
      images,
      description,
      id,
      battery,
      storage,
      connectivity,
      android,
      sizeAndWeight,
      display,
      hardware,
      camera,
      additionalFeatures,
    } = this.props.phoneDetails;

    return (
      <div className="phone-details">
        <div className="phone-details__gallery">
          <div className="phone-details__gallery--main-img">
            <img
              src={selectedImg}
              alt={name}
            />
          </div>
          <ul className="phone-details__gallery--list">
            {
              images.map(image => (
                <li
                  key={image}
                  className="phone-details__gallery--list-item"
                >
                  <img
                    onClick={this.handlerSelectImg}
                    src={image}
                    alt="phone photo"
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <article className="phone-details__main-info">
          <h2 className="phone-details__title">
            {name}
          </h2>
          <p className="phone-details__description">
            {description}
          </p>
          <div className="phone-details__basket">
            <Link
              className="phone-details__basket-add"
              onClick={handlerAddToBasket}
              name={id}
            >
              Add to basket
            </Link>
          </div>
        </article>
        <div className="phone-details__characters">
          <buttom
            type="button"
            onClick={() => this.handlerShowDetails()}
            className="phone-details__characters-show"
          >
            {showDetails ? 'Hide details' : 'Show getails'}
          </buttom>
          <ul
            className={showDetails ? 'phone-details__characters--specs'
              : `phone-details__characters--hide`}
          >
            <li className="phone-details__characters--specs-name">
              <span>Availability and Networks</span>
              <dl>
                <dt>Availability</dt>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Battery</span>
              <dl>
                <dt>Type</dt>
                <dd>{battery.type}</dd>
                <dt>Talk Time</dt>
                <dd>{battery.talkTime}</dd>
                <dt>Standby time (max)</dt>
                <dd>{battery.standbyTime}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Storage and Memory</span>
              <dl>
                <dt>RAM</dt>
                <dd>{storage.ram}</dd>
                <dt>Internal Storage</dt>
                <dd>{storage.flash}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Connectivity</span>
              <dl>
                <dt>Network Support</dt>
                <dt>WiFi</dt>
                <dd>{connectivity.wifi}</dd>
                <dt>Bluetooth</dt>
                <dd>{connectivity.bluetooth}</dd>
                <dt>Infrared</dt>
                <dd>
                  {connectivity.infrared ? '✓' : '✘'}
                </dd>
                <dt>GPS</dt>
                <dd>
                  {connectivity.gps ? '✓' : '✘'}
                </dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Android</span>
              <dl>
                <dt>OS Version</dt>
                <dd>{android.os}</dd>
                <dt>UI</dt>
                <dd>{android.ui}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Size and Weight</span>
              <dl>
                <dt>Dimensions</dt>
                {
                  sizeAndWeight.dimensions.map(size => (
                    <dd>{size}</dd>
                  ))
                }
                <dt>Weight</dt>
                <dd>{sizeAndWeight.weight}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              Display
              <dl>
                <dt>Screen size</dt>
                <dd>{display.screenSize}</dd>
                <dt>Screen resolution</dt>
                <dd>{display.creenResolution}</dd>
                <dt>Touch screen</dt>
                <dd>{display.touchScreen ? '✓' : '✘'}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Hardware</span>
              <dl>
                <dt>CPU</dt>
                <dd>{hardware.cpu}</dd>
                <dt>USB</dt>
                <dd>{hardware.usb}</dd>
                <dt>Audio / headphone jack</dt>
                <dd>{hardware.audioJack}</dd>
                <dt>FM Radio</dt>
                <dd>{hardware.fmRadio ? '✓' : '✘'}</dd>
                <dt>Accelerometer</dt>
                <dd>{hardware.accelerometer ? '✓' : '✘'}</dd>
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Camera</span>
              <dl>
                <dt>Primary</dt>
                <dd>{camera.primary}</dd>
                <dt>Features</dt>
                {
                  camera.features.map(feature => (
                    <dd>{feature}</dd>
                  ))
                }
              </dl>
            </li>
            <li className="phone-details__characters--specs-name">
              <span>Additional Features</span>
              <dl>
                <dt>Additional Features</dt>
                <dd>{additionalFeatures}</dd>
              </dl>
            </li>

          </ul>

        </div>

      </div>

    );
  }
}

PhoneDetails.propTypes = {
  phoneDetails: propTypes.shape().isRequired,
  handlerAddToBasket: propTypes.func.isRequired,
};

export default PhoneDetails;
