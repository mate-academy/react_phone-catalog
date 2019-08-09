import React from 'react'

class PhoneDetails extends React.Component {
  state = {
    currentImg: `/${this.props.phone.imageUrl}`,
  }

  componentDidMount = () => {
    const currentImage = `/${this.props.phone.imageUrl}`;

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
    const { id, phone, details } = this.props;
    const { currentImg } = this.state;

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
            {phone.name}
          </h1>
          <div
            className='currentPhone__top-block-snippet'
          >
            {phone.snippet}
          </div>
          <ul className='currentPhone__top-block-all-imgs'>
            {
              details.images.map(image =>
                <img
                  onClick={this.chooseCurrentImg}
                  className='currentPhone__top-block-all-imgs-item'
                  src={`/${image}`}
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