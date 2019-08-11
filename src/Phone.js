import React from 'react';

import SomeError from './SomeError';
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
    error: false,
  }

  componentDidMount() {
    const id = this.props.phoneId;
    fetch(`${dataFromUrl}/${id+ '.json'}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          phone: data,
          isLoaded: true,
        })
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoaded: false,
        })
    });
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
    const {phone, isLoaded, imageIndex, isShown, error} = this.state;
    const {handleClick} = this.props;

    return (
      <div className="Phone">
        {error ? <SomeError /> : ''}
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
                <div className="phoneimage_preview">
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
              <PhoneDetails
                phone={phone}
                handleClick={handleClick}
              />
            </>
            : ''
          }
      </div>
    )
  };
}
export default Phones;
