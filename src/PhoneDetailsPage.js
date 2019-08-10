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
    const { urlImg } = this.props;

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
  urlImg: PropTypes.string.isRequired,
};

export default PhoneDetailsPage;
