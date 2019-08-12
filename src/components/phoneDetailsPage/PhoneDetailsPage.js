/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { getPhoneDetails } from '../loadingData';
import PhoneDetails from '../phoneDetails/PhoneDetails';
import './phoneDetailsPage.css';
import Basket from '../basket/Basket';

class PhoneDetailsPage extends React.Component {
  state = {
    phone: [],
    mainImg: '',
    isError: '',
  }

  componentDidMount() {
    const { phoneId } = this.props.match.params;

    getPhoneDetails(phoneId).then(
      (data) => {
        this.setState({
          phone: { ...data },
          mainImg: data.images[0],
        });
      }
    ).catch(
      (error) => {
        this.setState({
          isError: error,
        });
      }
    );
  }

  changeImg = image => (
    this.setState({
      mainImg: image,
    })
  );

  render() {
    const { phone, mainImg, isError } = this.state;

    return (
      <div className="phone-details-page">
        {
          isError
            ? (
              <div>
                Sorry, we cannot find a page.
              </div>
            )
            : (
              <>
                <div className="phone-details-page__main-img">
                  <img src={mainImg} alt="phone" />
                </div>

                <div className="phone-details-page__info">
                  <div className="phone-details-page__info--name">
                    <h1>
                      {phone.name}
                    </h1>

                    <Basket.AddButton phone={phone} />
                  </div>

                  <p>
                    {phone.description}
                  </p>

                  <div className="phone-details-page__info--imges">
                    {
                      (phone.images)
                        && phone.images.map(image => (
                          <div
                            className={`phone-details-page__info--img
                              ${mainImg === image ? 'select' : undefined}`}
                          >
                            <img
                              src={`./${image}`}
                              alt="what the phone looks"
                              onClick={() => this.changeImg(image)}
                            />
                          </div>
                        ))
                    }
                  </div>
                </div>

                <div id="details" className="phone-details-page__details">
                  <PhoneDetails phone={phone} />
                </div>
              </>
            )
        }
      </div>
    );
  }
}

PhoneDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      phoneId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

export default PhoneDetailsPage;
