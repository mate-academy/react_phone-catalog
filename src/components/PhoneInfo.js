/*eslint-disable*/
import React from 'react';
import GetData from './GetData';
import NotFoundPage from './NotFoundPage';
import Loader from 'react-loader-spinner';
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

  render() {
    const { phoneId } = this.props.match.params;
    const { phoneInfo, isLoaded, errorLoading } = this.state;
    console.log(phoneInfo);
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
            src={this.state.activeImageUrl}/>
          <div className="Phone-info-main__images-row">
            {phoneInfo.images.map(image => (
              <img
                onMouseOver={() => this.imageChange(image)}
                key={image}
                className={image === this.state.activeImageUrl
                  ? 'Phone-info-main__images-row-image Phone-info-main__images-row-image--active'
                  : 'Phone-info-main__images-row-image'}
                src={image}/>
            ))}
          </div>
        </div>
        <div className="Phone-info-main__name-discription">
          <h3 className="Phone-info-main__name">{phoneInfo.name}</h3>
          <p className="Phone-info-main__discription">{phoneInfo.description}</p>
          <div className="Phone-info-main__discription-details">
            <div>
              <h5>-Additional Features</h5>
              <p>{phoneInfo.additionalFeatures}</p>
            </div>
            <div>
              <h5>-Operation system</h5>
              <div>
                {Object.entries(phoneInfo.android).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>-Availability</h5>
              <p>{phoneInfo.availability}</p>
            </div>
            <div>
              <h5>Battery</h5>
              <div>
                {Object.entries(phoneInfo.battery).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>Camera</h5>
              <div>
                {Object.entries(phoneInfo.camera).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>Connectivity</h5>
              <div>
                {Object.entries(phoneInfo.connectivity).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>Hardware</h5>
              <div>
                {Object.entries(phoneInfo.hardware).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>Size and weight</h5>
              <div>
                {Object.entries(phoneInfo.sizeAndWeight).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
            <div>
              <h5>Storage</h5>
              <div>
                {Object.entries(phoneInfo.storage).map(item => (
                  <p>{item.join(': ')}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default PhoneInfo;
