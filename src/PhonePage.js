import React from 'react';
import { Redirect } from 'react-router-dom';
import getDataJson from './getDataJson';
import NotFoundPage from './NotFoundPage';

import './slyles/phonePage.css';

class PhonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: {},
      error: true,
      phoneId: '',
      mainImgIndex: 0,
      isLoaded: false,
    }
  }

  componentDidMount = () => {
    if (this.state.phoneId !== this.props.addr.match.params.phone) {
      this.phoneLoad();
    }
    if (!this.props.phonesList[0]) {
      this.props.getPhonesList();
    }
  }

  componentDidUpdate = () => {
    if (this.state.phoneId !== this.props.addr.match.params.phone) {
      this.phoneLoad();
    }
    if (!this.props.phonesList[0]) {
      this.props.getPhonesList();
    }
  }

  phoneLoad = async() => {
    const urlPart = this.props.addr.match.params.phone;
    const phoneUrl = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${urlPart}.json`;
    const details = await getDataJson(phoneUrl);

    details
    ? this.setState({ phone: {...details}, error: false, phoneId: urlPart, isLoaded: true })
    : this.setState({ phone: {}, error: true, phoneId: urlPart, isLoaded: true });
  }

  getInfo = (spec) => {
    let returnedJSX = '';

    if (typeof(spec) === 'string'
    || typeof(spec) === 'number') {
      returnedJSX += `<td>${spec}</td>`;
      return returnedJSX;
    }

    if (typeof(spec) === 'boolean') {
      returnedJSX += spec ? `<td>Yes</td>` : `<td>No</td>`
      return returnedJSX;
    }

    if (spec === 'null' || !spec) {
      returnedJSX += `<td>N/A</td>`
      return returnedJSX;
    }

    if (Array.isArray(spec)) {
      for (let i = 0; i < spec.length; i++) {
        returnedJSX += this.getInfo(spec[i]);
        returnedJSX += `</tr><tr><td></td>`
      }
      return returnedJSX;
    }

    if (typeof(spec) === 'object') {
      for (let key in spec) {
        let word = key.replace(/([A-Z])/g, ' $1');
        word = word[0].toUpperCase() + word.slice(1);
        returnedJSX += `<tr><td><i>${word}</i>: </td>`;
        returnedJSX += this.getInfo(spec[key]);
        returnedJSX += `</tr>`;
      }
      return returnedJSX;
    }
  }

  render() {
    if (this.props.searchStr) {
      return (<Redirect to='/phones' />);
    }
    if (!this.state.isLoaded) {
      return (<div>Loding...</div>);
    }

    if (this.state.error)
    { return <NotFoundPage /> }

    const { phone, mainImgIndex } = this.state;
    const { buyNowHandler, inCart } = this.props;
    const phoneToCart = this.props.phonesList.find(phoneFromList => phoneFromList.id === phone.id);

    return (
      <div className="phonePage">
        <div className="mainPic">
          <img
            src={`https://mate-academy.github.io/phone-catalogue-static/${phone.images[mainImgIndex]}`}
            alt={`Foto of ${phone.name}`}
          />
        </div>

        <div className="model">
          <div className="modelLine">
            <h1>{phone.name}</h1>
            {inCart.includes(phone.id)
              ? <div className="buyNowBTN more" onClick={() => buyNowHandler(phoneToCart)}>Buy More</div>
              : <div className="buyNowBTN" onClick={() => buyNowHandler(phoneToCart)}>Buy Now</div>
            }
          </div>
          <div className="devider"></div>
        </div>

        <div className="description">
          {phone.description}
          <div className="fade"> </div>
        </div>

        <div className="thumbContainer">
          {phone.images.map((image, index) => (
            <div
              key={index}
              className={mainImgIndex === index ? "picThumbnail selected" : "picThumbnail"}
              onClick={() => this.setState({mainImgIndex: index})}
            >
              <img src={`https://mate-academy.github.io/phone-catalogue-static/${image}`}  alt="phone image thumbnail" />
            </div>
          ))}
        </div>

        <div className="specification">
          <div className="devider"></div>
          <h3>{phone.name}&nbsp;&nbsp;&nbsp;Specifications</h3>
          <div className="specInfo">
            <div className="specPart">
              <h4>Android:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.android)}} />
              <h4>HardWare:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.hardware)}} />
              <h4>Display:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.display)}} />
            </div>
            <div className="specPart">
              <h4>Camera:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.camera)}} />
              <h4>Storage:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.storage)}} />
              <h4>Connectivity:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.connectivity)}} />
            </div>
            <div className="specPart">
              <h4>Battery:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.battery)}} />
              <h4>Size and Weight</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.sizeAndWeight)}} />
              <h4>Availability:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.availability)}} />
              <h4>Additional Features:</h4>
              <table className="" dangerouslySetInnerHTML={{__html: this.getInfo(phone.additionalFeatures)}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default PhonePage;

