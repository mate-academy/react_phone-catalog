import React from 'react';

class PhoneDetail extends React.Component {
  state = {
    selectedPhoto: '',
  }

  componentDidMount() {
    const { phoneDetails } = this.props;

    this.setState({
      selectedPhoto: phoneDetails.images[0],
    })
  }

  handleSelectPhoto = (event) => {
    const {name} = event.target;

    this.setState({
      selectedPhoto: name,
    })
  }

  render() {
    const { phoneDetails } = this.props;
    const { selectedPhoto } = this.state;

    return (
      <>
        <div className="phone-details">
          <div className="phone-details_photo-selected">
            <div className="phone-details_selected-photo">
              <img
                src={selectedPhoto}
                alt={phoneDetails.name}
              />
            </div>
          </div>
          <div className="phone-details_main-info">
            <h1 className="phone-details_title">
              {phoneDetails.name}
            </h1>
            <p className="phone-details_description">
              {phoneDetails.description}
            </p>
            <ul className="phone-details_photos">
              {phoneDetails.images.map(image => (
                <li key={image}>
                  <img
                    onClick={this.handleSelectPhoto}
                    className="phone-details_photo"
                    src={image}
                    alt={image}
                    name={image}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="phone-details_info">
          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Camera</span>
            <dl>
              <dt>Features:</dt>
              {phoneDetails.camera.features.map(items => (
                <dd key={items}>{items}</dd>))}
              <dt>Primary:</dt>
              <dd>{phoneDetails.camera.primary}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Connectivity</span>
            <dl>
              <dt>Bluetooth:</dt>
              <dd>{phoneDetails.connectivity.bluetooth}</dd>
              <dt>Cell:</dt>
              <dd>{phoneDetails.connectivity.cell}</dd>
              <dt>GPS:</dt>
              <dd>{phoneDetails.connectivity.gps ? '+': '-'}</dd>
              <dt>Infrared:</dt>
              <dd>{phoneDetails.connectivity.infrared ? '+': '-'}</dd>
              <dt>Wi-fi:</dt>
              <dd>{phoneDetails.connectivity.wifi}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Battery</span>
            <dl>
              <dt>StandbyTime:</dt>
              <dd>{phoneDetails.battery.standbyTime}</dd>
              <dt>TalkTime:</dt>
              <dd>{phoneDetails.battery.talkTime}</dd>
              <dt>Type:</dt>
              <dd>{phoneDetails.battery.type}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Display</span>
            <dl>
              <dt>Screen Resolution:</dt>
              <dd>{phoneDetails.display.screenResolution}</dd>
              <dt>Screen size:</dt>
              <dd>{phoneDetails.display.screenSize}</dd>
              <dt>TouchScreen:</dt>
              <dd>{phoneDetails.display.touchScreen ? "+" : "-"}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Hardware</span>
            <dl>
              <dt>AudioJack:</dt>
              <dd>{phoneDetails.hardware.audioJack}</dd>
              <dt>Cpu:</dt>
              <dd>{phoneDetails.hardware.cpu}</dd>
              <dt>USB:</dt>
              <dd>{phoneDetails.hardware.usb}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Size and Weight</span>
            <dl>
              <dt>Dimensions:</dt>
              {phoneDetails.sizeAndWeight.dimensions.map(dimension => (
                <dd key={dimension}>{dimension}</dd>))}
              <dt>Weight:</dt>
              <dd>{phoneDetails.sizeAndWeight.weight}</dd>
            </dl>
          </section>
        </div>
      </>
    )
  }
};

export default PhoneDetail;
