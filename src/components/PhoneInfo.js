/*eslint-disable*/
import React from 'react';
import GetData from './GetData';
import NotFoundPage from './NotFoundPage';
import Loader from 'react-loader-spinner';
import PhoneInfoDetails from "./PhoneInfoDetails";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class PhoneInfo extends React.Component {
  state = {
    phoneInfo: [],
    isLoaded: false,
    errorLoading: false,
    activeImageUrl: '',
    phoneBodyDetails: [],
  };

  async componentDidMount() {
    const { phoneId } = this.props.match.params;
    const details = await GetData(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${phoneId}.json`)
      .catch(() => this.setState({
        errorLoading: true,
      }));
    if (!this.state.errorLoading) {
      this.setState({
        phoneInfo: details,
        isLoaded: true,
        activeImageUrl: details.images[0],
        phoneBodyDetails: details.toString(),
      });
    }
  }
  
  imageChange = (url) => {
    this.setState({
      activeImageUrl: url
    })
  };
  
  addCart = (event) => {
    event.preventDefault();
    const { phoneInfo } = this.state;
    const { url } = this.props.match;
    this.props.basketInject(phoneInfo.id, url, phoneInfo.name, phoneInfo.images[0])
  };

  render() {
    const { phoneId } = this.props.match.params;
    const { basket } = this.props;
    const { phoneInfo, isLoaded, errorLoading, activeImageUrl } = this.state;
    if(!isLoaded){
      return(
        <div className="Loader">
          <Loader
            type="TailSpin"
            color="#0072bc"
          />
        </div>
      );
    }
    if (errorLoading) {
      return(
        <NotFoundPage />
      )
    }
    return (
      <div className="Phone-info-main">
        <div className="Phone-info-main__images">
          <img
            className="Phone-info-main__image"
            src={activeImageUrl}
          />
          <div className="Phone-info-main__images-row">
            {phoneInfo.images.map(image => (
              <img
                onMouseOver={() => this.imageChange(image)}
                key={image}
                className={image === activeImageUrl
                  ? 'Phone-info-main__images-row-image Phone-info-main__images-row-image--active'
                  : 'Phone-info-main__images-row-image'}
                src={image}
              />
            ))}
          </div>
        </div>
        <div className="Phone-info-main__name-discription">
          <div className="Phone-info-main__head-and-button">
            <h3 className="Phone-info-main__name">{phoneInfo.name}</h3>
            <button
              onClick={this.addCart}
              disabled={basket.find(item => item.id === phoneInfo.id)
                ? 'disable'
                : ''}
              className='Phone-info-main__button'
            >
              {basket.find(item => item.id === phoneInfo.id)
                ? 'Added'
                : 'Add to cart'}
            </button>
          </div>
          <p className="Phone-info-main__discription">{phoneInfo.description}</p>
          <PhoneInfoDetails phoneInfo={phoneInfo} />
        </div>
        
      </div>
    )
  }
}

export default PhoneInfo;
