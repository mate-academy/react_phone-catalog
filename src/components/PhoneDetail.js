import React from 'react';
import { Link } from 'react-router-dom';

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
    const { name } = event.target;

    this.setState({
      selectedPhoto: name,
    })
  }

  render() {
    const { phoneDetails, addToBasketPhone } = this.props;
    const { selectedPhoto } = this.state;
    const {
      camera,
      battery,
      connectivity,
      display,
      hardware,
      sizeAndWeight,
      images,
      name,
      description
    } = this.props.phoneDetails;

    return (
      <>
        <div className="phone-details">
          <div className="phone-details_photo-selected">
            <div className="phone-details_selected-photo">
              <img
                src={selectedPhoto}
                alt={name}
              />
            </div>
          </div>
          <div className="phone-details_main-info">
            <h1 className="phone-details_title">
              {name}
            </h1>
            <p className="phone-details_description">
              {description}
            </p>
            <ul className="phone-details_photos">
              {images.map(image => (
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

            <div className="phone-details_cart-section">
              <Link
                className="phone-details_add-on-basket"
                onClick={addToBasketPhone}
                name={phoneDetails.id}
              >
                Add To Cart
          </Link>
            </div>

          </div>

        </div>
        <div className="phone-details_info">
          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Camera</span>
            <dl>
              <dt>Features:</dt>
              {camera.features.map(items => (
                <dd key={items}>{items}</dd>))}
              <dt>Primary:</dt>
              <dd>{camera.primary}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Connectivity</span>
            <dl>
              <dt>Bluetooth:</dt>
              <dd>{connectivity.bluetooth}</dd>
              <dt>Cell:</dt>
              <dd>{connectivity.cell}</dd>
              <dt>GPS:</dt>
              <dd>{connectivity.gps ? '+' : '-'}</dd>
              <dt>Infrared:</dt>
              <dd>{connectivity.infrared ? '+' : '-'}</dd>
              <dt>Wi-fi:</dt>
              <dd>{connectivity.wifi}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Battery</span>
            <dl>
              <dt>StandbyTime:</dt>
              <dd>{battery.standbyTime}</dd>
              <dt>TalkTime:</dt>
              <dd>{battery.talkTime}</dd>
              <dt>Type:</dt>
              <dd>{battery.type}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Display</span>
            <dl>
              <dt>Screen Resolution:</dt>
              <dd>{display.screenResolution}</dd>
              <dt>Screen size:</dt>
              <dd>{display.screenSize}</dd>
              <dt>TouchScreen:</dt>
              <dd>{display.touchScreen ? "+" : "-"}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Hardware</span>
            <dl>
              <dt>AudioJack:</dt>
              <dd>{hardware.audioJack}</dd>
              <dt>Cpu:</dt>
              <dd>{hardware.cpu}</dd>
              <dt>USB:</dt>
              <dd>{hardware.usb}</dd>
            </dl>
          </section>

          <section className="phone-details_characteristics">
            <span className="phone-details_characteristics__title-section">Size and Weight</span>
            <dl>
              <dt>Dimensions:</dt>
              {sizeAndWeight.dimensions.map(dimension => (
                <dd key={dimension}>{dimension}</dd>))}
              <dt>Weight:</dt>
              <dd>{sizeAndWeight.weight}</dd>
            </dl>
          </section>
        </div>
      </>
    )
  }
};

export default PhoneDetail;
