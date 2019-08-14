import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getDetails } from './getAPIDoc';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: null,
    imgChoseUrl: '',
  }

  async componentDidMount() {
    const phoneDetails = await getDetails(this.props.phoneId);

    this.setState({ phoneDetails });
  }

  handleChose = (imgUrl) => {
    this.setState({ imgChoseUrl: imgUrl });
  }

  render() {
    const { phoneDetails, imgChoseUrl } = this.state;
    const { urlImg, phoneId, phones } = this.props;

    const isPhoneId = phones.find(phone => phone.id === phoneId);

    if (!isPhoneId) {
      return (
        <div className="wrraper__was__not_phone">
          <h1 className="phone__was__not">Phone Was Not Found</h1>
        </div>
      );
    }

    return (
      phoneDetails === null ? <Loading />
        : (

          <div
            className="catalog__phones"
          >
            {imgChoseUrl
              ? (
                <img
                  src={`${urlImg}/${imgChoseUrl}`}
                  alt={`${imgChoseUrl}`}
                  className="card__img"
                />
              )
              : ''
            }
            {phoneDetails.images
              ? (
                <div>
                  <div className="container__for__images">
                    {phoneDetails.images.map(imgUrl => (
                      <img
                        onMouseOver={() => this.handleChose(`${imgUrl}`)}
                        key={imgUrl}
                        src={`${urlImg}/${imgUrl}`}
                        alt="phone"
                        className="card__img"
                        onFocus
                      />
                    ))}
                  </div>
                </div>
              )
              : ''
            }
            <div className="details">

              <h1>description</h1>
              <p>{`${phoneDetails.description}`}</p>
              <h3>Display</h3>
              <p>{`${phoneDetails.display.screenResolution}`}</p>
              <p>{`${phoneDetails.display.screenSize}`}</p>
              <h3>android</h3>
              <p>{`${phoneDetails.android.os}`}</p>
              <p>{`${phoneDetails.android.ui}`}</p>
              <h3>hardware</h3>
              <p>{`${phoneDetails.hardware.audioJack}`}</p>
              <p>{`${phoneDetails.hardware.cpu}`}</p>
              <p>{`${phoneDetails.hardware.usb}`}</p>
            </div>
          </div>
        ));
  }
}

PhoneDetailsPage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  urlImg: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  phones: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  phoneId: PropTypes.string,
};

export default PhoneDetailsPage;
