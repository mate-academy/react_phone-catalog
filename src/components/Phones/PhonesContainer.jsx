import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { getPhonesThunkCreator } from '../../redux/reducers/phonesReducer';
import { PhonesCatalog } from './PhonesCatalog';
import { Preloader } from '../Common/Preloader/Preloader';

class PhonesContainer extends React.Component {
  componentDidMount() {
    this.props.getPhonesThunk();
  }

  render() {
    return (
      <>
        <Phones />
        {this.props.isFetching ? <Preloader /> : null}
        <PhonesCatalog phones={this.props.phones} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  phones: state.phonesPage.phones,
  isFetching: state.phonesPage.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getPhonesThunk: () => dispatch(getPhonesThunkCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer);

PhonesContainer.propTypes = {
  getPhonesThunk: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      snippet: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
