import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { getPhoneDetail } from '../api/getData';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetail: {},
    selectedPhoto: '',
    isLoading: true,
  }

  async componentDidMount() {
    const { phoneId } = this.props.match.params;
    const phoneDetailFromApi = await getPhoneDetail(phoneId);

    this.setState({
      phoneDetail: phoneDetailFromApi,
      selectedPhoto: phoneDetailFromApi.images[0],
      isLoading: false,
    });
  }

  handleSelectPhoto = (event) => {
    this.setState({
      selectedPhoto: event.target.name,
    });
  };

  render() {
    const { phoneDetail, selectedPhoto, isLoading } = this.state;
    const { phoneId } = this.props.match.params;

    return (
      <>
        {isLoading && (
          <Loader
            type="Oval"
            color="rgb(22, 105, 105)"
            height="50"
            width="50"
            className="loader"
          />
        )}

        {phoneId === phoneDetail.id && (
          <>
            <div className="phone-details">

              <div>
                <img
                  src={selectedPhoto}
                  alt={selectedPhoto}
                />
              </div>

              <div className="phone-info">

                <h1 className="phone-name">{phoneDetail.name}</h1>
                <p>{phoneDetail.description}</p>

                <ul className="photo-list">
                  {phoneDetail.images.map(img => (
                    <li key={img}>
                      <img
                        className="photo-detail"
                        src={img}
                        alt={img}
                        name={img}
                        onClick={this.handleSelectPhoto}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="phone-specifications">

              <section className="phone-specifications__section">
                <h2>Display</h2>
                <h3>Screen size:</h3>
                <p>{phoneDetail.display.screenSize}</p>
                <h3>Screen Resolution:</h3>
                <p>{phoneDetail.display.screenResolution}</p>
                <h3>Touch Screen:</h3>
                <p>{phoneDetail.display.touchScreen ? 'Yes' : 'No'}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Camera</h2>
                <h3>Features:</h3>
                <p>{phoneDetail.camera.features.join(', ')}</p>
                <h3>Primary:</h3>
                <p>{phoneDetail.camera.primary}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Connectivity</h2>
                <h3>Network Support</h3>
                <h3>Bluetooth:</h3>
                <p>{phoneDetail.connectivity.bluetooth}</p>
                <h3>Infrared:</h3>
                <p>{phoneDetail.connectivity.infrared ? 'Yes' : 'No'}</p>
                <h3>Wifi:</h3>
                <p>{phoneDetail.connectivity.wifi}</p>
                <h3>GPS:</h3>
                <p>{phoneDetail.connectivity.gps ? 'Yes' : 'No'}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Android</h2>
                <h3>OS Version:</h3>
                <p>{phoneDetail.android.os}</p>
                <h3>UI:</h3>
                <p>{phoneDetail.android.ui}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Battery</h2>
                <h3>Type:</h3>
                <p>{phoneDetail.battery.type}</p>
                <h3>Talk Time:</h3>
                <p>{phoneDetail.battery.talkTime}</p>
                <h3>Standby time (max):</h3>
                <p>{phoneDetail.battery.standbyTime}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Hardware</h2>
                <h3>CPU:</h3>
                <p>{phoneDetail.hardware.cpu}</p>
                <h3>USB:</h3>
                <p>{phoneDetail.hardware.usb}</p>
                <h3>Audio / headphone jack:</h3>
                <p>{phoneDetail.hardware.audioJack}</p>
                <h3>FM Radio:</h3>
                <p>{phoneDetail.hardware.fmRadio ? 'Yes' : 'No'}</p>
                <h3>Accelerometer:</h3>
                <p>{phoneDetail.hardware.accelerometer ? 'Yes' : 'No'}</p>
                <h3>Physical keyboard:</h3>
                <p>{phoneDetail.hardware.physicalKeyboard ? 'Yes' : 'No'}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Size and Weight</h2>
                <h3>Dimensions:</h3>
                <p>{phoneDetail.sizeAndWeight.dimensions.join(', ')}</p>
                <h3>Weight:</h3>
                <p>{phoneDetail.sizeAndWeight.weight}</p>
              </section>

              <section className="phone-specifications__section">
                <h2>Storage and Memory</h2>
                <h3>RAM:</h3>
                <p>{phoneDetail.storage.ram}</p>
                <h3>Internal Storage:</h3>
                <p>{phoneDetail.storage.flash}</p>
              </section>

            </div>
          </>
        )}
      </>
    );
  }
}

export default PhoneDetailsPage;
