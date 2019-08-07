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
  };

  async componentDidMount() {
    const details = await GetData('https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom.json');
    this.setState({
      phoneInfo: details,
      isLoaded: true,
    });
  }

  render() {
    const { phoneId } = this.props.match.params;
    const { phoneInfo, isLoaded } = this.state;
    console.log(phoneId, phoneInfo, isLoaded);
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
    if(phoneId !== phoneInfo.id) {
      return (
        <NotFoundPage />
      );
    }
    return (
      <h1>Loaded</h1>
    )
  }
}

export default PhoneInfo;
