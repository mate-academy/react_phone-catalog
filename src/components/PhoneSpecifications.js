import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PhoneSpecification = ({ details }) => {
  const {
    availability,
    battery,
    camera,
    connectivity,
    display,
    hardware,
    storage,
    sizeAndWeight,
  } = details;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isVisible
        ? (
          <div className="phone__params">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="cart-btn params-toggle-btn"
            >
              Hide specifications
            </button>

            <ul className="phone__params-list">
              <li>
                <h3>Availability</h3>
                <ul className="phone__specifications">
                  {availability
                    .filter(item => item !== '').length > 0
                    ? (
                      availability.map(prop => (
                        <li key={prop}>
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
                    <div>{battery.standbyTime}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Talk-time: </h4>
                    <div>{battery.talkTime}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Type: </h4>
                    <div>{battery.type}</div>
                  </li>
                </ul>
              </li>

              <li>
                <h3>Camera</h3>
                <ul>
                  <>
                    {camera.features
                      .filter(item => item !== '').length > 0
                      ? (
                        <li className="phone__specifications">
                          <h4 className="phone__specifications-title">
                            Features:
                          </h4>

                          <ul className="phone__specifications-list">
                            {camera.features.map(prop => (
                              <li key={prop}>{prop}</li>
                            ))}
                          </ul>
                        </li>
                      ) : '-'
                    }
                  </>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Primary: </h4>
                    <div>
                      {camera.primary ? `${camera.primary}` : '-'}
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <h3>Connectivity</h3>
                <ul>
                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Bluetooth: </h4>
                    <div>{connectivity.bluetooth}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Cell: </h4>
                    <div>{connectivity.cell}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">GPS: </h4>
                    <div>{connectivity.gps ? 'Yes' : 'No'}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">infrared: </h4>
                    <div>{connectivity.infrared ? 'Yes' : 'No'}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Wi-Fi: </h4>
                    <div>{connectivity.wifi}</div>
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
                    <div>{display.screenResolution}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">
                      Screen size:
                    </h4>
                    <div>{display.screenSize}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">
                      TouchScreen:
                    </h4>
                    <div>{display.touchScreen}</div>
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
                    <div>{hardware.accelerometer ? 'Yes' : 'No'}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">
                      Audio Jack:
                    </h4>
                    <div>{hardware.audioJack}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">CPU: </h4>
                    <div>{hardware.cpu}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">FM-radio: </h4>
                    <div>{hardware.fmRadio ? 'Yes' : 'No'}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">
                      Physical keyboard:
                    </h4>
                    <div>{hardware.physicalKeyboard ? 'Yes' : 'No'}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">USB: </h4>
                    <div>{hardware.usb}</div>
                  </li>
                </ul>
              </li>

              <li>
                <h3>Storage</h3>
                <ul>
                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Flash: </h4>
                    <div>{storage.flash}</div>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">RAM: </h4>
                    <div>{storage.ram}</div>
                  </li>
                </ul>
              </li>

              <li>
                <h3>Size and weigth</h3>
                <ul>
                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">
                      Dimensions:
                    </h4>
                    <ul className="phone__specifications-list">
                      {sizeAndWeight.dimensions.map(prop => (
                        <li key={prop}>{prop}</li>
                      ))}
                    </ul>
                  </li>

                  <li className="phone__specifications">
                    <h4 className="phone__specifications-title">Weight: </h4>
                    <div>{sizeAndWeight.weight}</div>
                  </li>
                </ul>

              </li>
            </ul>
          </div>
        ) : (
          <div className="phone__params">
            <button
              type="button"
              onClick={() => setIsVisible(true)}
              className="cart-btn params-toggle-btn"
            >
              Show specifications
            </button>
          </div>
        )
      }
    </>
  );
};

PhoneSpecification.propTypes = {
  details: PropTypes.shape({
    availability: PropTypes.array.isRequired,
    battery: PropTypes.object.isRequired,
    camera: PropTypes.object.isRequired,
    connectivity: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
    hardware: PropTypes.object.isRequired,
    storage: PropTypes.object.isRequired,
    sizeAndWeight: PropTypes.object.isRequired,
  }).isRequired,
};

export default PhoneSpecification;
