import React from 'react';
import { getPhonesData } from './Api/getData';

class Phone extends React.Component {
  state = {
    phoneDetails: [],
  }

  async componentDidMount() {
    const response = await getPhonesData(this.props.match.params.phoneId);

    this.setState({
      phoneDetails: response,
    });
  }

  render() {

    const { match } = this.props;
    const { phoneDetails } = this.state;

    if (phoneDetails.images) {
      return (

        <div className="container">
          <h1>{phoneDetails.name}</h1>
          <div className="images">
            {phoneDetails.images.map(img => (
              <img className= "responsive-img" src={img} alt={phoneDetails.name} />
            ))}
          </div>
          <div className="row ">
            <div className="col s12 l6">
              <h4>Сharacteristic</h4>
              <ul className="col s12 l6">
                <li><span>Storage:</span> {phoneDetails.storage.flash}</li>
                <li><span>Ram:</span> {phoneDetails.storage.ram}</li>
                <li><span>Display:</span> {phoneDetails.display.screenResolution}</li>
                <li><span>CPU:</span> {phoneDetails.hardware.cpu}</li>
                <li><span>GPS:</span> {phoneDetails.connectivity.gps && 'Yes'}</li>
              </ul>
              <ul className="col s12 l6">
                <li><span>Talk time:</span> {phoneDetails.battery.talkTime}</li>
                <li><span>AudioJack:</span> {phoneDetails.hardware.audioJack}</li>
                <li><span>Camera:</span> {phoneDetails.camera.primary}</li>
                <li><span>Wi-fi:</span> {phoneDetails.connectivity.wifi}</li>
                <li><span>Weight:</span> {phoneDetails.sizeAndWeight.weight}</li>
              </ul>
              <div className="row">
                <div className="col s6 l6">
                  <div className="card-action">
                    <a href="#/cart" className="btn waves-effect waves-purple">Add to cart</a>
                  </div>
                </div>
                <div className="col s6 l6">
                  <div className="card-action">
                    <a href="#/phones-page" className="btn waves-effect waves-purple">To catalog</a>
                  </div>
                </div>
              </div>

            </div>
            <div className="col s12 6">
              <h4>Description</h4>
              <p>{phoneDetails.description}</p>
              <p>{phoneDetails.additionalFeatures}</p>
            </div>
          </div>
        </div>

      );
    }

    return (
   <span>Loanding...</span>
    );
  }
}

export default Phone;
