import React from 'react';
import PropTypes from 'prop-types';

const PhoneSpecification = ({ isVisible, toggleParams, details }) => (
  <>
    {isVisible
      ? (
        <div className="phone__params">
          <button
            type="button"
            onClick={toggleParams}
            className="cart-btn params-toggle-btn"
          >
            Hide specifications
          </button>

          <ul className="phone__params-list">
            <li>
              <h3>Availability</h3>
              <ul className="phone__specifications">
                {details.availability
                  .filter(item => item !== '').length > 0
                  ? (
                    details.availability.map(prop => (
                      <li>
                        {prop.replace(',', '')}
                      </li>
                    ))
                  ) : '-'
                }

              </ul>
            </li>

            <li>
              <h3>Battery</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">
                    Stand by time:
                  </h4>
                  <div>{details.battery.standbyTime}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Talk-time: </h4>
                  <div>{details.battery.talkTime}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Type: </h4>
                  <div>{details.battery.type}</div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Camera</h3>
              <ul>
                <>
                  {details.camera.features
                    .filter(item => item !== '').length > 0
                    ? (
                      <li className="phone__specifications">
                        <h4 className="phone__specifications-title">
                          Features:
                        </h4>

                        <ul className="phone__specifications-list">
                          {details.camera.features.map(prop => (
                            <li>{prop}</li>
                          ))}
                        </ul>
                      </li>
                    ) : '-'
                  }
                </>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Primary: </h4>
                  <div>
                    {details.camera.primary ? `${details.camera.primary}` : '-'}
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Connectivity</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Bluetooth: </h4>
                  <div>{details.connectivity.bluetooth}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Cell: </h4>
                  <div>{details.connectivity.cell}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">GPS: </h4>
                  <div>{details.connectivity.gps ? 'Yes' : 'No'}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">infrared: </h4>
                  <div>{details.connectivity.infrared ? 'Yes' : 'No'}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Wi-Fi: </h4>
                  <div>{details.connectivity.wifi}</div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Display</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">
                    Screen resolution:
                  </h4>
                  <div>{details.display.screenResolution}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Screen size: </h4>
                  <div>{details.display.screenSize}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">TouchScreen: </h4>
                  <div>{details.display.touchScreen}</div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Hardware</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">
                    Accelerometer:
                  </h4>
                  <div>{details.hardware.accelerometer ? 'Yes' : 'No'}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Audio Jack: </h4>
                  <div>{details.hardware.audioJack}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">CPU: </h4>
                  <div>{details.hardware.cpu}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">FM-radio: </h4>
                  <div>{details.hardware.fmRadio ? 'Yes' : 'No'}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">
                    Physical keyboard:
                  </h4>
                  <div>{details.hardware.physicalKeyboard ? 'Yes' : 'No'}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">USB: </h4>
                  <div>{details.hardware.usb}</div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Storage</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Flash: </h4>
                  <div>{details.storage.flash}</div>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">RAM: </h4>
                  <div>{details.storage.ram}</div>
                </li>
              </ul>
            </li>

            <li>
              <h3>Size and weigth</h3>
              <ul>
                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Dimensions: </h4>
                  <ul className="phone__specifications-list">
                    {details.sizeAndWeight.dimensions.map(prop => (
                      <li key={prop}>{prop}</li>
                    ))}
                  </ul>
                </li>

                <li className="phone__specifications">
                  <h4 className="phone__specifications-title">Weight: </h4>
                  <div>{details.sizeAndWeight.weight}</div>
                </li>
              </ul>

            </li>
          </ul>
        </div>
      ) : (
        <div className="phone__params">
          <button
            type="button"
            onClick={toggleParams}
            className="cart-btn params-toggle-btn"
          >
            Show specifications
          </button>
        </div>
      )
    }
  </>
);

PhoneSpecification.propTypes = {
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleParams: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default PhoneSpecification;
