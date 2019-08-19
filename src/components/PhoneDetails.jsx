import React from 'react'
import BASE_IMAGE_URL from './constants'

class PhoneDetails extends React.Component {
  state = {
    currentImg: '',
  }

  componentDidMount = () => {
    const { details } = this.props;


    const currentImage = `${BASE_IMAGE_URL}/${details.images[0]}`;

    this.setState({
      currentImg: currentImage,
    })
  }

  chooseCurrentImg = (event) => {
    const { src } = event.target;

    this.setState({
      currentImg: src,
    })
  }

  render() {
    const { details } = this.props;
    const { currentImg } = this.state;

    console.log(details);

    return (
      <div>
        <section
          className='currentPhone__top-block'
        >
          <img
            className='currentPhone__top-block-current-img'
            src={currentImg}
            alt="phone_photo"
          />
          <h1 className='currentPhone__top-block-title'>
            {details.name}
          </h1>
          <div
            className='currentPhone__top-block-snippet'
          >
            {details.description}
          </div>
          <ul className='currentPhone__top-block-all-imgs'>
            {
              details.images.map(image =>
                <img
                  onClick={this.chooseCurrentImg}
                  className='currentPhone__top-block-all-imgs-item'
                  src={`${BASE_IMAGE_URL}/${image}`}
                  alt=""
                />
              )
            }
          </ul>
        </section>
        <section>
        </section>
      </div>
    )
  }
}

export default PhoneDetails