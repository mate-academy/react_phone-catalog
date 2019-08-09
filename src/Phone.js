import React from 'react';

import Loader from './Loader';
import PhoneDetails from './PhoneDetails';
import './styles/phone.css';

const dataFromUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const imageFromUrl = 'https://mate-academy.github.io/phone-catalogue-static';

class Phones extends React.Component {
  state = {
    phone: {},
    isLoaded: false,
    imageIndex: 0,
    isShown: false,
  }

  componentDidMount() {
    const id = this.props.match.params.phoneId;
    fetch(`${dataFromUrl}/${id+ '.json'}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          phone: data,
          isLoaded: true,
        })
      })
  };

  handleSwitchImage = (index) => {
    this.setState({
      imageIndex: index,
      isShown: true,
    })
  };

  handleCloseImage = () => {
    this.setState({
      isShown: false,
    })
  };

  render() {
    const phoneImages = (`/${this.state.phone.images}`).split(',');
    const {phone, isLoaded, imageIndex, isShown} = this.state;

    return (
      <div>
        {isLoaded ?
          <>
            {isShown ?
            <div className="change_img_block">
            <div>
              {imageIndex > 0 &&
              <button  onClick={() => this.handleSwitchImage(imageIndex -1)} className="change-button">
              {'<'}
              </button>}
              </div>
              <div>
                <img
                  src={`${imageFromUrl}/${phoneImages[imageIndex]}`}
                  alt="Phone"
                />
                </div>
                <div>
              {imageIndex < phoneImages.length-1 &&
              <button  onClick={() => this.handleSwitchImage(imageIndex +1)} className="change-button">
                {'>'}
              </button>}
              </div>
              <button className="change-button" onClick={()=> this.handleCloseImage()} >{'Close'}</button>
            </div>
              :  '' }
          <div className="phoneimage">
            {phoneImages.map((image, index) => (
              <img
                  src={`${imageFromUrl}/${image}`}
                className="img_preview"
                key={Math.random()}
                alt="Phone"
                onClick={() => this.handleSwitchImage(index)}
              />
            ))}
          </div>
          <PhoneDetails phone={phone} />
          </>
          : <Loader />
        }
      </div>
    )
  };
}
export default Phones;
