/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import { getExtraDetails } from '../api/getPhones';

class PhoneDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      extraData: {},
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const extraData = await getExtraDetails(id);

    this.setState({ extraData });
  }

  render() {
    const { extraData } = this.state;
    const { id } = this.props;

    return (
      <>
        <div>
          <Link to="/phones">
            <button className="btn btn-back" type="button">
              {'<<- Back to all phones'}
            </button>
          </Link>
          <Link to="/cart">
            <button className="btn btn-buy" type="button">
              {'->> BUY NOW  <<-'}
            </button>
          </Link>
          {id === extraData.id ? (
            <>
              <div className="extra-details">
                <div className="extra-details-photo-selected">
                  <img
                    className="selected-photo"
                    src={extraData.images[0]}
                    alt="mobile-phone"
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
                        <li key={img}>
                          <img
                            className="extra-details-photos-item"
                            src={img}
                            alt={img}
                          />
                        </li>
                      ))}
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
                {'Maybe this page is not available, '}
                <Link to="/phones">go back</Link>
                {' and try checking late'}
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
