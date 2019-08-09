import React from 'react';
import PropTypes from 'prop-types';

class PhoneDetails extends React.Component {
  state={
    imageUrl: this.props.phoneDetails.images[0],
  }

  handleImageIndex = (event) => {
    this.setState({ imageUrl: event.target.name });
  }

  render() {
    const { phoneDetails } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className="phone__details">
        <img src={imageUrl} alt={phoneDetails.name} />

        {phoneDetails.images.map(imgUrl => (
          <input
            name={imgUrl}
            onClick={this.handleImageIndex}
            key={imgUrl}
            type="image"
            className="phone__galery"
            src={imgUrl}
            alt={phoneDetails.name}
          />
        ))}

        <table>
          <tbody>
            <tr>
              <td>Additional Features:</td>

              <td>
                <ul>
                  <li>{phoneDetails.additionalFeatures}</li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>android:</td>

              <td>
                <ul>
                  <li>
os:
                    {`${phoneDetails.android.os}`}
                  </li>
                  <li>
ui:
                    {`${phoneDetails.android.ui}`}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>battery:</td>

              <td>
                <ul>
                  <li>
standbyTime:
                    {`${phoneDetails.battery.standbyTime}`}
                  </li>
                  <li>
talkTime:
                    {`${phoneDetails.battery.talkTime}`}
                  </li>
                  <li>
type:
                    {`${phoneDetails.battery.type}`}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>camera:</td>

              <td>
                <ul>
                  <li>
screenResolution:
                    {`${phoneDetails.camera.features}`}
                  </li>
                  <li>
primary:
                    {`${phoneDetails.camera.primary}`}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>connectivity:</td>

              <td>
                <ul>
                  <li>
bluetooth:
                    {`${phoneDetails.connectivity.bluetooth}`}
                  </li>
                  <li>
cell:
                    {`${phoneDetails.connectivity.cell}`}
                  </li>
                  <li>
gps:
                    {`${phoneDetails.connectivity.gps}`}
                  </li>
                  <li>
infrared:
                    {`${phoneDetails.connectivity.infrared}`}
                  </li>
                  <li>
wifi:
                    {`${phoneDetails.connectivity.wifi}`}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>display:</td>

              <td>
                <ul>
                  <li>
screenResolution:
                    {`${phoneDetails.display.screenResolution}`}
                  </li>
                  <li>
screenSize:
                    {`${phoneDetails.display.screenSize}`}
                  </li>
                  <li>
touchScreen:
                    {`${phoneDetails.display.touchScreen}`}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>hardware:</td>

              <td>
                <ul>
                  <li>
accelerometer:
                    {`${phoneDetails.hardware.accelerometer}`}
                  </li>
                  <li>
audioJack:
                    {`${phoneDetails.hardware.audioJack} `}
                  </li>
                  <li>
cpu:
                    {`${phoneDetails.hardware.cpu} `}
                  </li>
                  <li>
fmRadio:
                    {`${phoneDetails.hardware.fmRadio} `}
                  </li>
                  <li>
physicalKeyboard:
                    {`${phoneDetails.hardware.physicalKeyboard} `}
                  </li>
                  <li>
usb:
                    {`${phoneDetails.hardware.usb} `}
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>sizeAndWeight:</td>

              <td>
                <ul>
                  <li>
dimensions:
                    {phoneDetails.sizeAndWeight.dimensions}
                  </li>
                  <li>
weight:
                    {phoneDetails.sizeAndWeight.weight}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

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
