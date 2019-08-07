/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { getPhoneDetails } from '../loadingData';
import PhoneDetails from '../phoneDetails/PhoneDetails';
import './phoneDetailsPage.css';

class PhoneDetailsPage extends React.Component {
  state = {
    phone: [],
    mainImg: '',
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
    );
  }

  changeImg = image => (
    this.setState({
      mainImg: image,
    })
  );

  addToBasket = (id, name) => {
    const { history } = this.props;

    if (localStorage.getItem('buy')) {
      localStorage.buy += `&${id}*1`;
    } else {
      localStorage.buy = `${id}*1`;
    }

    localStorage.setItem(id, name);

    history.replace(history.location);
  };

  render() {
    const { phone, mainImg } = this.state;

    return (
      <div className="phone-details-page">
        {
          localStorage.length !== 0 && (
            <div className="header__basket--count">
              {localStorage.length !== 0 && localStorage.length - 1}
            </div>
          )
        }

        <div className="phone-details-page__main-img">
          <img src={mainImg} alt="" />
        </div>

        <div className="phone-details-page__info">
          <div className="phone-details-page__info--name">
            <h1>
              {phone.name}
            </h1>

            <button
              type="button"
              disabled={localStorage.getItem(phone.id) && true}
              className="phone-catalog__phone--buy"
              onClick={() => this.addToBasket(phone.id, phone.name)}
            >
              {
                localStorage.getItem(phone.id)
                  ? 'Added to basket'
                  : 'Buy'
              }
            </button>
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
                      alt=""
                      onClick={() => this.changeImg(image)}
                    />
                  </div>
                ))
            }
          </div>
        </div>

        <div id="details" className="phone-details-page__details">
          <PhoneDetails />
        </div>
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
