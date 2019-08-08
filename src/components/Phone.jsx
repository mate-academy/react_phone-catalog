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
          <article className="phone-details_header">
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
            <div>
              <img
                src={currentPhone.images[currentImage]}
                alt={currentPhone.name}
                className="phone-details_images-current-img"
              />
            </div>

          </article>
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
