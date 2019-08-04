/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from "./Loader";

import { getExtraDetails } from '../api/getPhones';
import NotFoundPage from './NotFoundPage';


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

  // async componentDidUpdate() {
  //   const { id } = this.props;
  //   const extraData = await getExtraDetails(id);

  //   if (this.state.extraData.id !== id) {
  //     this.setState({ extraData });
  //   }
  // }

  render() {
    console.log(this.props.id);
    console.log(this.state.extraData);
    const { extraData } = this.state;
    const { id } = this.props;

    return (
      <>
        <div>
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
          {id === extraData.id ? (
            <>
              <div className="extra-details">
                <div className="extra-details-photo-selected">
                  <img
                    className="selected-photo"
                    src={extraData.images[0]}
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
                <section class="more-info">
                  <h3>Camera</h3>
                  <i>features:</i>
                  {extraData.camera.features.map(i => (
                    <>{i}</>
                  ))}
                  <p>
                    <i>primary:</i>
                    <p>{extraData.camera.primary}</p>
                  </p>
                </section>

                <section class="more-info">
                  <h3>Battery</h3>
                  <i>standbyTime:</i>
                  {extraData.battery.standbyTime}
                  <p>
                    <i>talkTime:</i>
                    {extraData.battery.talkTime}
                  </p>
                  <p>
                    <i>type:</i>
                  </p>
                  {extraData.battery.type}
                </section>

                <section class="more-info">
                  <h3>Hardware</h3>
                  <i>audioJack:</i> {extraData.hardware.audioJack}
                  <p>
                    <i>cpu:</i>
                  </p>{" "}
                  {extraData.hardware.cpu}
                  <p>
                    <i>usb:</i>
                    {extraData.hardware.usb}
                  </p>
                </section>

                <section class="more-info">
                  <h3>Size and Weight</h3>
                  <i>dimensions:</i>
                  <>
                    {extraData.sizeAndWeight.dimensions.map(d => (
                      <p>{d}</p>
                    ))}
                  </>
                  weight: {extraData.sizeAndWeight.weight}
                </section>

                {/* as
    "sizeAndWeight": {
        "dimensions": [
            "63.0 mm (w)",
            "123.9 mm (h)",
            "10.88 mm (d)"
        ],
        "weight": "129.0 grams"

d */}
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

export default PhoneDetails;
