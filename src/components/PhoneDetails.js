/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import { getExtraDetails } from '../api/getPhones';

class PhoneDetails extends Component {
  state = {
    extraData: {},
    selectedPhoto: '',
  };

  async componentDidMount() {
    const { id } = this.props;
    const extraData = await getExtraDetails(id);

    this.setState({
      extraData,
      selectedPhoto: extraData.images[0],
    });
  }

  handleChoosePhoto = (event) => {
    const { name } = event.target;

    this.setState({ selectedPhoto: name });
  };

  render() {
    const { extraData } = this.state;
    const { id } = this.props;

    return (
      <>
        <div>
          {id === extraData.id ? (
            <>
              <Link to="/phones">
                <button className="btn btn-back" type="button">
                  {"<<- Back to all phones"}
                </button>
              </Link>
              <Link to="/cart">
                <button className="btn btn-buy" type="button">
                  {"->> BUY NOW  <<-"}
                </button>
              </Link>
              <div className="extra-details">
                <div className="extra-details-photo-selected">
                  <img
                    className="selected-photo"
                    src={this.state.selectedPhoto}
                    alt={this.state.selectedPhoto}
                  />
                </div>
                <article>
                  <span className="extra-details-title">
                    {extraData.name}
                  </span>
                  <div className="extra-details-description">
                    <div className="extra-details-text">
                      {extraData.description}
                    </div>
                    <ul className="extra-details-photos">
                      {extraData.images.map(img => (
                        <li onClick={this.handleChoosePhoto} key={img}>
                          <img
                            className="extra-details-photos-item"
                            src={img}
                            alt={img}
                            name={img}
                          />
                        </li>
                      ))}
                      <li>
                        <img
                          className="extra-details-photos-item extra-details-photos-item-cart-add "
                          src="./img/cart-add.png"
                          alt="add-to-cart"
                          title="Click for adding to cart "
                        />
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
              <div className="extra-details-more-details">
                <section className="more-info">
                  <h3>Camera</h3>
                  <i>features:</i>
                  {extraData.camera.features.map(i => (
                    <span key={i}>{i}</span>
                  ))}
                  <p>
                    <i>primary:</i>
                    <span>{extraData.camera.primary}</span>
                  </p>
                </section>

                <section className="more-info">
                  <h3>Battery</h3>
                  <i>standbyTime:</i>
                  <span>{extraData.battery.standbyTime}</span>
                  <p>
                    <i>talkTime:</i>
                    {extraData.battery.talkTime}
                  </p>
                  <p>
                    <i>type:</i>
                  </p>
                  {extraData.battery.type}
                </section>

                <section className="more-info">
                  <h3>Hardware</h3>
                  <i>audioJack:</i>
                  {extraData.hardware.audioJack}
                  <p>
                    <i>cpu:</i>
                    {extraData.hardware.cpu}
                  </p>
                  <p>
                    <i>usb:</i>
                    {extraData.hardware.usb}
                  </p>
                </section>

                <section className="more-info">
                  <h3>Size and Weight</h3>
                  <i>dimensions:</i>
                  <>
                    {extraData.sizeAndWeight.dimensions.map(d => (
                      <span key={d}>{d}</span>
                    ))}
                  </>
                  weight:
                  {extraData.sizeAndWeight.weight}
                </section>
              </div>
            </>
          ) : (
            <>
              <Loader />
              <p>
                {"Maybe this page is not available, "}
                <Link to="/phones">go back</Link>
                {" and try checking late"}
              </p>
            </>
          )}
        </div>
      </>
    );
  }
}

PhoneDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PhoneDetails;
