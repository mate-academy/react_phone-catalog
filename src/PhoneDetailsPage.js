import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const getDetails = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static';
  const response = await fetch(`${url}/api/phones/motorola-xoom.json`);

  const currentContent = await response.json();

  return currentContent;
};

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: [],
    imgChoseUrl: '',
  }

  async componentDidMount() {
    const phoneDetails = await getDetails();

    this.setState({ phoneDetails });
  }

  handleChose = (imgUrl) => {
    this.setState({ imgChoseUrl: imgUrl });
  }

  render() {
    const { phoneDetails, imgChoseUrl } = this.state;
    const { urlImg, phoneId, phones } = this.props;

    const isPhoneId = phones.find(phone => phone.id === phoneId);

    if (phoneId && !isPhoneId) {
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
                  alt="Motorrola"
                  className="card__img"
                />
              )
              : ''
            }
            {phoneDetails.images
              ? phoneDetails.images.map(imgUrl => (
                <img
                  onMouseOver={() => this.handleChose(`${imgUrl}`)}
                  key={imgUrl}
                  src={`${urlImg}/${imgUrl}`}
                  alt="Motorrola"
                  className="card__img"
                  onFocus
                />
              ))
              : ''
            }
            <p>{`${urlImg}/${phoneDetails.description}`}</p>
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
