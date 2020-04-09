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
