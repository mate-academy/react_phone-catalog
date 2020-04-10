import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PhoneDetails } from './PhoneDetails';
import { getPhoneDetails } from '../../../api/api';
import {
  setPhoneDetailsAC,
} from '../../../redux/reducers/phoneDetailsReducer';

class PhoneDetailsContainer extends React.Component {
  componentDidMount() {
    getPhoneDetails()
      .then(data => {
        this.props.setPhoneDetails(data);
      });
  }

  render() {
    return (
      <PhoneDetails
        details={this.props.details}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.phoneDetailsPage.details,
});

const mapDispatchToProps = (dispatch) => ({
  setPhoneDetails: (details) => dispatch(setPhoneDetailsAC(details)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(PhoneDetailsContainer);

PhoneDetailsContainer.propTypes = {
  setPhoneDetails: PropTypes.func.isRequired,
};

PhoneDetailsContainer.propTypes = {
  details: PropTypes.shape({
    additionalFeatures: PropTypes.string,
    android: PropTypes.shape({
      os: PropTypes.string,
      ui: PropTypes.string,
    }).isRequired,
    availability: PropTypes.arrayOf(PropTypes.string).isRequired,
    battery: PropTypes.shape({
      standbyTime: PropTypes.string,
      talkTime: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    camera: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.string),
      primary: PropTypes.string,
    }).isRequired,
    connectivity: PropTypes.shape({
      bluetooth: PropTypes.string,
      cell: PropTypes.string,
      gps: PropTypes.bool,
      infrared: PropTypes.bool,
      wifi: PropTypes.string,
    }).isRequired,
    description: PropTypes.string.isRequired,
    display: PropTypes.shape({
      screenResolution: PropTypes.string,
      screenSize: PropTypes.string,
      touchScreen: PropTypes.bool,
    }).isRequired,
    hardware: PropTypes.shape({
      accelerometer: PropTypes.bool,
      audioJack: PropTypes.string,
      cpu: PropTypes.string,
      fmRadio: PropTypes.bool,
      physicalKeyboard: PropTypes.bool,
      usb: PropTypes.string,
    }).isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    sizeAndWeight: PropTypes.shape({
      dimensions: PropTypes.arrayOf(PropTypes.string),
      weight: PropTypes.string,
    }).isRequired,
    storage: PropTypes.shape({
      flash: PropTypes.string,
      ram: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
