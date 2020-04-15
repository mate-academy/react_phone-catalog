import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PhoneDetails } from './PhoneDetails';
import { Preloader } from '../../Common/Preloader/Preloader';
import {
  getPhoneDetailsThunkCreator,
} from '../../../redux/reducers/phoneDetailsReducer';
import { phoneDetailsPropType } from '../../../propTypesConstants';

class PhoneDetailsContainer extends React.Component {
  componentDidMount() {
    const { phoneId } = this.props.match.params;

    this.props.getPhoneDetailsThunk(phoneId);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <PhoneDetails
          details={this.props.details}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.phoneDetailsPage.details,
  isFetching: state.phoneDetailsPage.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getPhoneDetailsThunk: (phoneId) => {
    dispatch(getPhoneDetailsThunkCreator(phoneId));
  },
});

const WithUrlDataContainer = withRouter(PhoneDetailsContainer);

export default connect(
  mapStateToProps, mapDispatchToProps,
)(WithUrlDataContainer);

PhoneDetailsContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      phoneId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getPhoneDetailsThunk: PropTypes.func.isRequired,
  details: phoneDetailsPropType.isRequired,
};
