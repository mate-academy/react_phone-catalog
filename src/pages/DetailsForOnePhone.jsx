import React from 'react'
import { BASE_URL } from '../components/constants'
import PropTypes from 'prop-types';

class DetailsForOnePhone extends React.Component {
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

  chooseCurrentImg = (event) => {
    const { src } = event.target;

    this.setState({
      currentImg: src,
    })
  };

  render() {
    const { detailsOfCurrentPhone } = this.props;
    const { currentImg } = this.state;

    return (
      <div>
        <div>
          <img
            src={currentImg}
            alt="phone_photo"
          />
          <div>
            {
              detailsOfCurrentPhone.images.map(image =>
                <input
                  key={`${BASE_URL}/${image}`}
                  type="image"
                  onClick={this.chooseCurrentImg}
                  src={`${BASE_URL}/${image}`}
                  alt=""
                />
              )
            }
          </div>
        </div>
        <div>
          <h1>
            {detailsOfCurrentPhone.name}
          </h1>
          <div>
            {detailsOfCurrentPhone.description}
          </div>
        </div>

        <div>
          <h3>Phone details</h3>
          <ul>
            <li key={"android"}>
              <h4>Android:</h4>
              <dl>
                <dt>OS:</dt>
                <dd>{detailsOfCurrentPhone.android.os}</dd>
                <dt>UI:</dt>
                <dd>{detailsOfCurrentPhone.android.ui}</dd>
              </dl>
            </li>
            <li key={"battery"}>
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
            <li key={"camera"}>
              <h4>Camera: </h4>
              <dl>
                <dt>Screen Resolution:</dt>
                <dd>
                  {detailsOfCurrentPhone.camera.features
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                      className='icon'
                      src="./img/no_circle.svg"
                      alt="No"
                    />
                    )
                  }
                </dd>
                <dt>Primary:</dt>
                <dd>
                  {detailsOfCurrentPhone.camera.primary
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img 
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="No"
                    />
                    )
                  }
                </dd>
              </dl>
            </li>

            <li key="connectivity">
              <h4>Connectivity:</h4>

              <dl>
                <dt>Bluetooth:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.bluetooth}</dd>

                <dt>Cell:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.cell}</dd>

                <dt>Gps:</dt>
                <dd>
                  {detailsOfCurrentPhone.connectivity.gps
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>

                <dt>Infrared:</dt>
                <dd>
                  {detailsOfCurrentPhone.connectivity.infrared
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>

                <dt>Wifi:</dt>
                <dd>{detailsOfCurrentPhone.connectivity.wifi}</dd>
              </dl>
            </li>

            <li key="display">
              <h4>Display:</h4>

              <dl>
                <dt>Screen Resolution:</dt>
                <dd>{detailsOfCurrentPhone.display.screenResolution}</dd>

                <dt>Sreen Size:</dt>
                <dd>{detailsOfCurrentPhone.display.screenSize}</dd>

                <dt>TouchScreen:</dt>
                <dd>
                  {detailsOfCurrentPhone.display.touchScreen
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>
              </dl>
            </li>

            <li key="hardware">
              <h4>Hardware:</h4>

              <dl>
                <dt>Accelerometer:</dt>
                <dd>
                  {detailsOfCurrentPhone.hardware.accelerometer

                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>

                <dt>AudioJack:</dt>
                <dd>{detailsOfCurrentPhone.hardware.audioJack}</dd>

                <dt>CPU:</dt>
                <dd>{detailsOfCurrentPhone.hardware.cpu}</dd>

                <dt>Fm Radio:</dt>
                <dd>
                  {detailsOfCurrentPhone.hardware.fmRadio

                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>

                <dt>Physical Keyboard:</dt>
                <dd>
                  {detailsOfCurrentPhone.hardware.fmRadio
                    ? (
                      <img
                        className='icon'
                        src="./img/check_circle.svg"
                        alt="Yes"
                      />
                    )
                    : (
                      <img
                        className='icon'
                        src="./img/no_circle.svg"
                        alt="Yes"
                      />
                    )}
                </dd>

                <dt>USB:</dt>
                <dd>{detailsOfCurrentPhone.hardware.usb}</dd>
              </dl>
            </li>

            <li key="sizeAndWeight">
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
      </div>
    )
  }
}

DetailsForOnePhone.propTypes = {
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
};

export default DetailsForOnePhone