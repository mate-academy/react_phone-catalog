import React from 'react'
import { loadPhoneDetailsAPI } from '../api/API_DATA';
import LoadAnimation from './LoadAnimation'


class Phone extends React.Component {
  state = {
    currentPhone: [],
    currentImage: 0,
    isLoaded: false,
    isLoading: false,
  }

  componentDidMount = async() => {
    this.setState({
      isLoading: true,
    });

    const loadPhoneDetails = await loadPhoneDetailsAPI(this.props.phone.id);

    this.setState({
      currentPhone: loadPhoneDetails,
      isLoaded: true,
      isLoading: false,
    });
  }

  handleChangePhoto = (index) => {
    this.setState({ currentImage: index });
  }


  render () {
    const { currentPhone, isLoading, isLoaded, currentImage } = this.state
    console.log(currentPhone)

    if (isLoaded) {
      return (
        <main>

          <div className="phone-details_name">
            {currentPhone.name}
          </div>

          <div className="phone-details_additionalFeatures">
            {currentPhone.additionalFeatures}
          </div>

          <article className="phone-details_header">
            <div>
              <img
                src={currentPhone.images[currentImage]}
                alt={currentPhone.name}
                className="phone-details_images-current-img"
              />
            </div>

            <div className="phone-details_images">
              {currentPhone.images.map((image, index) => (
                <img
                  name={image}
                  onClick={() => this.handleChangePhoto(index)}
                  src={image}
                  alt={currentPhone.name}
                  className="phone-details_images-img"
                />
              ))}
            </div>
          </article>

          <div className="phone-details_description">
            {currentPhone.description}
          </div>

          <section>
            <div className="specifications_sign">
              Specifications
            </div>
            <div className="specifications">
              <div className='specifications_details'>
                <p className="specifications_details-sign">Operating system</p>
                <p>os: {currentPhone.android.os}</p>
                <p>ui: {currentPhone.android.ui}</p>
              </div>
              <div className='specifications_details'>
               <p className="specifications_details-sign">Camera</p>
                <p>primary: {currentPhone.camera.primary}</p>
                <p>features: {currentPhone.camera.features.join(', ')}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">Battary</p>
                <p>standbyTime: {currentPhone.battery.standbyTime}</p>
                <p>talkTime: {currentPhone.battery.talkTime}</p>
                <p>type: {currentPhone.battery.type}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">Connectivity</p>
                <p>bluetooth: {currentPhone.connectivity.bluetooth}</p>
                <p>cell: {currentPhone.connectivity.cell}</p>
                <p>gps: {currentPhone.connectivity.gps  ? 'yes' : 'no'}</p>
                <p>infrared: {currentPhone.connectivity.infrared ? 'yes' : 'no'}</p>
                <p>wifi: {currentPhone.connectivity.wifi}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">Display</p>
                <p>screenResolution: {currentPhone.display.screenResolution}</p>
                <p>screenSize: {currentPhone.display.screenSize}</p>
                <p>touchScreen: {currentPhone.display.touchScreen ? 'yes' : 'no'}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">Hardware</p>
                <p>accelerometer: {currentPhone.hardware.accelerometer ? 'yes' : 'no'}</p>
                <p>audioJack: {currentPhone.hardware.audioJack}</p>
                <p>cpu: {currentPhone.hardware.cpu}</p>
                <p>fmRadio: {currentPhone.hardware.fmRadio ? 'yes' : 'no'}</p>
                <p>physicalKeyboard: {currentPhone.hardware.physicalKeyboard ? 'yes' : 'no'}</p>
                <p>usb: {currentPhone.hardware.usb}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">Storage</p>
                <p >flash: {currentPhone.storage.flash} </p>
                <p>ram: {currentPhone.storage.ram}</p>
              </div>
              <div className='specifications_details'>
                <p className="specifications_details-sign">sizeAndWeight </p>
                <p>{currentPhone.sizeAndWeight.dimensions.join(', ')}</p>
                <p>weight: {currentPhone.sizeAndWeight.weight}</p>
              </div>
            </div>
          </section>
        </main>
      )
    }

    return (
      <div className="load-sign" >
          {isLoading ? <LoadAnimation />  : ''}
      </div>
    );
  }
}

export default Phone
