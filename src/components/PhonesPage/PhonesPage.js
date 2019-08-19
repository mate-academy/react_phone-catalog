import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { loadPhones } from '../../redux/actions';
import PhoneCatalog from '../PhoneCatalog/PhoneCatalog';
import Loader from '../Loader/Loader';
import PhoneDetailsPage from '../PhoneDetailsPage/PhoneDetailsPage';
import './PhonesPage.css';

class PhonesPage extends React.Component {
  async componentDidMount() {
    this.props.payLoad();
  }

  render() {
    const { isLoaded } = this.props;

    return (
      <div>
        {isLoaded
          ? (
            <Switch>
              <Route path="/phones" exact component={PhoneCatalog} />
              <Route
                path="/phones/:phoneId"
                exact
                component={PhoneDetailsPage}
              />
            </Switch>
          )
          : <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: state.isLoadedPhones,
});

const mapDispatchToProps = dispatch => ({
  payLoad: () => dispatch(loadPhones()),
});

PhonesPage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  payLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhonesPage);
