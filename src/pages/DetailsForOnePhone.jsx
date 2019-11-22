import React from 'react'
import { BASE_URL } from '../components/constants'

class DetailsForOnePhone extends React.Component {
  state = {
    currentImg: '',
  }

  componentDidMount = () => {
    const { details } = this.props;

    const currentImage = `${BASE_URL}/${details.images[0]}`;

    this.setState({
      currentImg: currentImage,
    })
  }

  chooseCurrentImg = (event) => {
    const { src } = event.target;

    this.setState({
      currentImg: src,
    })
  }

  render() {
    const { details } = this.props;
    const { currentImg } = this.state;

    console.log(details);

    return (
      <div>
        <div>
          <img
            src={currentImg}
            alt="phone_photo"
          />
          <div>
            {
              details.images.map(image =>
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
            {details.name}
          </h1>
          <div>
            {details.description}
          </div>
        </div>

        <div>
          <h3>Phone details</h3>
          <ul>
            <li key={"android"}>
              <h4>Android:</h4>
              <dl>
                <dt>OS:</dt>
                <dd>{details.android.os}</dd>
                <dt>UI:</dt>
                <dd>{details.android.ui}</dd>
              </dl>
            </li>
            <li key={"battery"}>
              <h4>Battery</h4>
              <dl>
                <dt>Stand by time:</dt>
                <dd>{details.battery.standbyTime}</dd>
                <dt>Talk time:</dt>
                <dd>{details.battery.talkTime}</dd>
                <dt>Type:</dt>
                <dd>{details.battery.type}</dd>
              </dl>
            </li>
            <li key={"camera"}>
              <h4>Camera: </h4>
              <dl>
                <dt>Screen Resolution:</dt>
                <dd>
                  {details.camera.features
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
                  {details.camera.primary
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
                <dd>{details.connectivity.bluetooth}</dd>

                <dt>Cell:</dt>
                <dd>{details.connectivity.cell}</dd>

                <dt>Gps:</dt>
                <dd>
                  {details.connectivity.gps
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
                  {details.connectivity.infrared
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
                <dd>{details.connectivity.wifi}</dd>
              </dl>
            </li>

            <li key="display">
              <h4>Display:</h4>

              <dl>
                <dt>Screen Resolution:</dt>
                <dd>{details.display.screenResolution}</dd>

                <dt>Sreen Size:</dt>
                <dd>{details.display.screenSize}</dd>

                <dt>TouchScreen:</dt>
                <dd>
                  {details.display.touchScreen
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
                  {details.hardware.accelerometer

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
                <dd>{details.hardware.audioJack}</dd>

                <dt>CPU:</dt>
                <dd>{details.hardware.cpu}</dd>

                <dt>Fm Radio:</dt>
                <dd>
                  {details.hardware.fmRadio

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
                  {details.hardware.fmRadio
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
                <dd>{details.hardware.usb}</dd>
              </dl>
            </li>

            <li key="sizeAndWeight">
              <h4>Size And Weight:</h4>

              <dl>
                <dt>Dimensions:</dt>
                <dd>{details.sizeAndWeight.dimensions}</dd>

                <dt>Weight:</dt>
                <dd>{details.sizeAndWeight.dimensions}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default DetailsForOnePhone