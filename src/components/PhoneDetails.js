import React from 'react';
import PropTypes from 'prop-types';

const PhoneDetails = ({ phoneDetails }) => (
  <div className="phone__details">
    <h3>Phone details</h3>
    <ul className="phone__details-list">
      <li className="phone__details-item">
        <h4>Android:</h4>

        <dl>
          <dt>OS:</dt>
          <dd>{phoneDetails.android.os}</dd>

          <dt>UI:</dt>
          <dd>{phoneDetails.android.ui}</dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Battery:</h4>

        <dl>
          <dt>Stand by Time:</dt>
          <dd>{phoneDetails.battery.standbyTime}</dd>

          <dt>Talk Time:</dt>
          <dd>{phoneDetails.battery.talkTime}</dd>

          <dt>Type:</dt>
          <dd>{phoneDetails.battery.type}</dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Camera:</h4>

        <dl>
          <dt>Screen Resolution:</dt>
          <dd>
            {phoneDetails.camera.features
              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>Primary:</dt>
          <dd>
            {phoneDetails.camera.primary
              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Connectivity:</h4>

        <dl>
          <dt>Bluetooth:</dt>
          <dd>{phoneDetails.connectivity.bluetooth}</dd>

          <dt>Cell:</dt>
          <dd>{phoneDetails.connectivity.cell}</dd>

          <dt>Gps:</dt>
          <dd>
            {phoneDetails.connectivity.gps
              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>Infrared:</dt>
          <dd>
            {phoneDetails.connectivity.infrared
              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>Wifi:</dt>
          <dd>{phoneDetails.connectivity.wifi}</dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Display:</h4>

        <dl>
          <dt>Screen Resolution:</dt>
          <dd>{phoneDetails.display.screenResolution}</dd>

          <dt>Sreen Size:</dt>
          <dd>{phoneDetails.display.screenSize}</dd>

          <dt>TouchScreen:</dt>
          <dd>
            {phoneDetails.display.touchScreen
              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Hardware:</h4>

        <dl>
          <dt>Accelerometer:</dt>
          <dd>
            {phoneDetails.hardware.accelerometer

              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>AudioJack:</dt>
          <dd>{phoneDetails.hardware.audioJack}</dd>

          <dt>CPU:</dt>
          <dd>{phoneDetails.hardware.cpu}</dd>

          <dt>Fm Radio:</dt>
          <dd>
            {phoneDetails.hardware.fmRadio

              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>Physical Keyboard:</dt>
          <dd>
            {phoneDetails.hardware.fmRadio

              ? (
                <img
                  src="./img/check_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )
              : (
                <img
                  src="./img/no_circle.svg"
                  alt="Yes"
                  className="phone__detail-availabilty"
                />
              )}
          </dd>

          <dt>USB:</dt>
          <dd>{phoneDetails.hardware.usb}</dd>
        </dl>
      </li>

      <li className="phone__details-item">
        <h4>Size And Weight:</h4>

        <dl>
          <dt>Dimensions:</dt>
          <dd>{phoneDetails.sizeAndWeight.dimensions}</dd>

          <dt>Weight:</dt>
          <dd>{phoneDetails.sizeAndWeight.dimensions}</dd>
        </dl>
      </li>
    </ul>
  </div>
);

PhoneDetails.propTypes = {
  phoneDetails: PropTypes.shape({
    images: PropTypes.array,
    sizeAndWeight: PropTypes.object,
    hardware: PropTypes.object,
    display: PropTypes.object,
    connectivity: PropTypes.object,
    camera: PropTypes.object,
    battery: PropTypes.object,
    android: PropTypes.object,
    additionalFeatures: PropTypes.string,
  }).isRequired,
};

export default PhoneDetails;
